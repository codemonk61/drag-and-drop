import { useState, useEffect, useCallback, useRef } from 'react';
import { DndContext, DragOverlay, useDroppable, pointerWithin, rectIntersection } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import Sidebar from './features/editor/Sidebar';
import SortableItem from './features/editor/SortableItem';
import SettingsPanel from './features/editor/SettingsPanel';
import StorefrontRenderer from './features/preview/StorefrontRenderer';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider, useToast } from './components/Toast';
import { INITIAL_PROPS, COMPONENT_MAP, CONTAINER_TYPES } from './utils/componentMap';
import { TEMPLATES } from './utils/templates';

export default function App() {
  return (
    <ToastProvider>
      <ErrorBoundary>
        <PageBuilder />
      </ErrorBoundary>
    </ToastProvider>
  );
}

function PageBuilder() {
  const [layout, setLayout] = useState(() => {
    try { return JSON.parse(localStorage.getItem('store-layout')) || []; }
    catch { return []; }
  });
  const [isPreview, setIsPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [selectedId, setSelectedId] = useState(null);
  const [activeDragId, setActiveDragId] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const toast = useToast();
  const isDirtyRef = useRef(false);

  // Persist layout with quota protection
  useEffect(() => {
    try {
      localStorage.setItem('store-layout', JSON.stringify(layout));
      isDirtyRef.current = false;
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        toast('Storage full! Export your layout to save it.', 'warning', 5000);
      }
    }
  }, [layout, toast]);

  // Warn before closing with unsaved changes
  useEffect(() => {
    const handler = (e) => {
      if (isDirtyRef.current) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);

  // Track history for undo — use refs to avoid stale closures
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);

  const pushHistory = useCallback((newLayout) => {
    isDirtyRef.current = true;
    const sliced = historyRef.current.slice(0, historyIndexRef.current + 1);
    const next = [...sliced, newLayout].slice(-30);
    historyRef.current = next;
    historyIndexRef.current = next.length - 1;
    setHistory(next);
    setHistoryIndex(next.length - 1);
  }, []);

  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      setHistoryIndex(historyIndexRef.current);
      setLayout(historyRef.current[historyIndexRef.current]);
      toast('Undo', 'info', 1500);
    }
  }, [toast]);

  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1;
      setHistoryIndex(historyIndexRef.current);
      setLayout(historyRef.current[historyIndexRef.current]);
      toast('Redo', 'info', 1500);
    }
  }, [toast]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleExport();
        toast('Layout saved!', 'success');
      }
      if (e.key === 'Delete' && selectedId) {
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        removeComponent(selectedId);
        setSelectedId(null);
      }
      if (e.key === 'Escape') {
        setSelectedId(null);
        setShowTemplates(false);
        setShowClearConfirm(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo, selectedId]);

  const setLayoutWithHistory = (updater) => {
    setLayout(prev => {
      const newLayout = typeof updater === 'function' ? updater(prev) : updater;
      pushHistory(newLayout);
      return newLayout;
    });
  };

  const addComponent = (type, parentId = null, index = null) => {
    const newItem = { id: `${type}-${Date.now()}`, type, props: { ...INITIAL_PROPS[type] }, children: [] };
    if (parentId) {
      setLayoutWithHistory(prev => updateLayoutWithNewChild(prev, parentId, newItem));
    } else if (index !== null) {
      setLayoutWithHistory(prev => {
        const next = [...prev];
        next.splice(index, 0, newItem);
        return next;
      });
    } else {
      setLayoutWithHistory(prev => [...prev, newItem]);
    }
    setSelectedId(newItem.id);
  };

  const removeComponent = (id) => {
    if (selectedId === id) setSelectedId(null);
    setLayoutWithHistory(prev => removeItemFromLayout(prev, id));
    toast('Block removed', 'info', 1500);
  };

  const duplicateComponent = (id) => {
    setLayoutWithHistory(prev => {
      const result = duplicateInLayout(prev, id);
      if (result.newId) setSelectedId(result.newId);
      return result.layout;
    });
    toast('Block duplicated', 'success', 1500);
  };

  const updateProps = (id, key, val) => {
    setLayoutWithHistory(prev => updateItemProps(prev, id, key, val));
  };

  // --- Export / Import ---
  const handleExport = () => {
    const data = JSON.stringify(layout, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trafasa-layout-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Layout exported!', 'success');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const imported = JSON.parse(ev.target.result);
          if (!Array.isArray(imported)) {
            toast('Invalid layout file', 'error');
            return;
          }
          setLayoutWithHistory(imported);
          toast('Layout imported!', 'success');
        } catch {
          toast('Failed to parse layout file', 'error');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  // --- Templates ---
  const applyTemplate = (template) => {
    // Deep clone with new IDs so templates can be applied multiple times
    const clonedLayout = template.layout.map(item => deepCloneWithNewIds(item));
    setLayoutWithHistory(clonedLayout);
    setShowTemplates(false);
    toast(`"${template.name}" template applied!`, 'success');
  };

  // --- Clear canvas ---
  const handleClearCanvas = () => {
    setLayoutWithHistory([]);
    setSelectedId(null);
    setShowClearConfirm(false);
    toast('Canvas cleared', 'info');
  };

  // Custom collision: prefer nested drop zones over canvas
  const collisionDetection = useCallback((args) => {
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) {
      const nested = pointerCollisions.filter(c => String(c.id).startsWith('drop-'));
      if (nested.length > 0) return nested;
      return pointerCollisions;
    }
    return rectIntersection(args);
  }, []);

  const handleDragStart = (e) => {
    setActiveDragId(e.active.id);
  };

  const handleDragEnd = (e) => {
    setActiveDragId(null);
    const { active, over } = e;
    if (!over) return;

    const overId = String(over.id);
    const isFromSidebar = active.data?.current?.fromSidebar;
    const activeId = String(active.id);

    let targetParentId = null;
    if (overId.startsWith('drop-')) {
      targetParentId = overId.replace('drop-', '');
    } else if (overId !== 'canvas-droppable') {
      const overItem = findItemById(layout, overId);
      if (overItem && CONTAINER_TYPES.has(overItem.type)) {
        targetParentId = overId;
      }
    }

    if (isFromSidebar) {
      const blockType = active.data.current.blockType;
      if (targetParentId) {
        addComponent(blockType, targetParentId);
      } else if (overId === 'canvas-droppable') {
        addComponent(blockType);
      } else {
        const overIndex = layout.findIndex(i => i.id === overId);
        if (overIndex !== -1) {
          addComponent(blockType, null, overIndex);
        } else {
          addComponent(blockType);
        }
      }
      return;
    }

    if (activeId === overId) return;

    if (targetParentId) {
      if (activeId === targetParentId) return;
      const activeItem = findItemById(layout, activeId);
      if (activeItem && isAncestor(activeItem, targetParentId)) return;
      setLayoutWithHistory(prev => moveItemToParent(prev, activeId, targetParentId));
    } else {
      setLayoutWithHistory(prev => reorderInLayout(prev, activeId, overId));
    }
  };

  const selectedItem = findItemById(layout, selectedId);

  const getActiveDragPreview = () => {
    if (!activeDragId) return null;
    if (typeof activeDragId === 'string' && activeDragId.startsWith('sidebar-')) {
      const blockType = activeDragId.replace('sidebar-', '');
      const label = blockType.replace(/_/g, ' ');
      return (
        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-medium opacity-90">
          + {label}
        </div>
      );
    }
    const item = findItemById(layout, activeDragId);
    if (item) {
      const Comp = COMPONENT_MAP[item.type];
      return (
        <div className="opacity-70 shadow-2xl rounded-lg overflow-hidden max-w-[600px] pointer-events-none">
          {Comp && <Comp props={item.props}>{null}</Comp>}
        </div>
      );
    }
    return null;
  };

  const DEVICE_WIDTHS = { desktop: '100%', tablet: '768px', mobile: '375px' };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top bar */}
      <header className="h-12 bg-[#16162a] text-white flex justify-between items-center px-5 flex-shrink-0 z-50">
        <div className="flex items-center gap-4">
          <span className="font-bold tracking-[0.2em] text-sm">TRAFASA</span>
          <span className="text-[10px] text-gray-500 font-medium px-2 py-0.5 bg-white/5 rounded">BUILDER</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          {!isPreview && (
            <div className="flex items-center gap-1 mr-2">
              <button onClick={undo} disabled={historyIndex <= 0} className="p-1.5 rounded hover:bg-white/10 disabled:opacity-20 transition-all" title="Undo (Ctrl+Z)" aria-label="Undo">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
              </button>
              <button onClick={redo} disabled={historyIndex >= history.length - 1} className="p-1.5 rounded hover:bg-white/10 disabled:opacity-20 transition-all" title="Redo (Ctrl+Shift+Z)" aria-label="Redo">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 10H11a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" /></svg>
              </button>
            </div>
          )}

          {/* Device preview toggle (in preview mode) */}
          {isPreview && (
            <div className="flex items-center gap-1 mr-2 bg-white/5 rounded-lg p-0.5">
              {[
                { id: 'desktop', label: 'Desktop', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
                { id: 'tablet', label: 'Tablet', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
                { id: 'mobile', label: 'Mobile', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
              ].map(d => (
                <button
                  key={d.id}
                  onClick={() => setPreviewDevice(d.id)}
                  className={`p-1.5 rounded transition-all ${previewDevice === d.id ? 'bg-white/20 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                  title={d.label}
                  aria-label={`Preview on ${d.label}`}
                >
                  {d.icon}
                </button>
              ))}
            </div>
          )}

          {/* Actions menu */}
          {!isPreview && (
            <div className="flex items-center gap-1 mr-2">
              <button onClick={() => setShowTemplates(true)} className="p-1.5 rounded hover:bg-white/10 transition-all text-gray-400 hover:text-white" title="Templates" aria-label="Templates">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
              </button>
              <button onClick={handleExport} className="p-1.5 rounded hover:bg-white/10 transition-all text-gray-400 hover:text-white" title="Export Layout (Ctrl+S)" aria-label="Export Layout">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
              <button onClick={handleImport} className="p-1.5 rounded hover:bg-white/10 transition-all text-gray-400 hover:text-white" title="Import Layout" aria-label="Import Layout">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              </button>
              {layout.length > 0 && (
                <button onClick={() => setShowClearConfirm(true)} className="p-1.5 rounded hover:bg-red-500/20 transition-all text-gray-400 hover:text-red-400" title="Clear Canvas" aria-label="Clear Canvas">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              )}
            </div>
          )}

          <button
            onClick={() => { setIsPreview(!isPreview); setPreviewDevice('desktop'); }}
            className={`px-4 py-1.5 text-xs font-medium tracking-wide rounded transition-all ${
              isPreview
                ? 'bg-white text-gray-900 hover:bg-gray-100'
                : 'bg-white/10 hover:bg-white/15 border border-white/10'
            }`}
          >
            {isPreview ? 'Back to Editor' : 'Preview'}
          </button>
        </div>
      </header>

      {/* Main area */}
      {isPreview ? (
        <main className="flex-1 overflow-y-auto bg-gray-200 flex justify-center">
          <div
            className="bg-white min-h-screen transition-all duration-300"
            style={{
              width: DEVICE_WIDTHS[previewDevice],
              maxWidth: '100%',
              boxShadow: previewDevice !== 'desktop' ? '0 0 40px rgba(0,0,0,0.15)' : 'none',
              containerType: 'inline-size',
            }}
          >
            <ErrorBoundary>
              <StorefrontRenderer layout={layout} />
            </ErrorBoundary>
          </div>
        </main>
      ) : (
        <DndContext
          collisionDetection={collisionDetection}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-1 overflow-hidden">
            <Sidebar addComponent={addComponent} />

            <main
              className="flex-1 overflow-y-auto"
              onClick={() => setSelectedId(null)}
            >
              <div className="max-w-[900px] mx-auto my-6">
                <DroppableCanvas>
                  <SortableContext items={layout.map(i => i.id)} strategy={verticalListSortingStrategy}>
                    {layout.length === 0 ? (
                      <CanvasEmpty onShowTemplates={() => setShowTemplates(true)} />
                    ) : (
                      layout.map(item => (
                        <ErrorBoundary key={item.id}>
                          <SortableItem
                            id={item.id}
                            item={item}
                            isSelected={selectedId === item.id}
                            selectedId={selectedId}
                            onSelect={setSelectedId}
                            removeComponent={removeComponent}
                            duplicateComponent={duplicateComponent}
                            updateProps={updateProps}
                          />
                        </ErrorBoundary>
                      ))
                    )}
                  </SortableContext>
                </DroppableCanvas>
              </div>
            </main>

            <SettingsPanel
              item={selectedItem}
              updateProps={updateProps}
              removeComponent={removeComponent}
              duplicateComponent={duplicateComponent}
            />
          </div>

          <DragOverlay dropAnimation={null}>
            {getActiveDragPreview()}
          </DragOverlay>
        </DndContext>
      )}

      {/* Templates Modal */}
      {showTemplates && (
        <TemplatesModal
          onApply={applyTemplate}
          onClose={() => setShowTemplates(false)}
          hasExisting={layout.length > 0}
        />
      )}

      {/* Clear Confirmation */}
      {showClearConfirm && (
        <ConfirmModal
          title="Clear Canvas"
          message="Are you sure? This will remove all blocks from the canvas. You can undo this action."
          confirmLabel="Clear All"
          onConfirm={handleClearCanvas}
          onCancel={() => setShowClearConfirm(false)}
        />
      )}
    </div>
  );
}

// --- UI Sub-components ---

function DroppableCanvas({ children }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-droppable' });
  return (
    <div
      ref={setNodeRef}
      className={`bg-white shadow-sm min-h-[600px] transition-colors ${isOver ? 'ring-2 ring-blue-400 ring-inset bg-blue-50/30' : ''}`}
    >
      {children}
    </div>
  );
}

function CanvasEmpty({ onShowTemplates }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-8 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-400 mb-2">Start building your page</h3>
      <p className="text-sm text-gray-400 max-w-xs mb-6">
        Drag blocks from the left panel or double-click them to add to your page.
      </p>
      <button
        onClick={onShowTemplates}
        className="px-5 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
      >
        Start with a Template
      </button>
    </div>
  );
}

function TemplatesModal({ onApply, onClose, hasExisting }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Choose a Template</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {hasExisting ? 'This will replace your current layout' : 'Pick a starting point for your page'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Close">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
          {TEMPLATES.map(tpl => (
            <button
              key={tpl.id}
              onClick={() => onApply(tpl)}
              className="text-left p-5 border-2 border-gray-100 rounded-xl hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  {tpl.id === 'blank' && <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
                  {tpl.id === 'luxe' && <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
                  {tpl.id === 'landing' && <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" /></svg>}
                  {tpl.id === 'ecommerce' && <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                  {tpl.id === 'portfolio' && <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{tpl.name}</h3>
                  <p className="text-xs text-gray-500">{tpl.layout.length} blocks</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{tpl.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ title, message, confirmLabel, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onCancel}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Helper functions ---

function findItemById(layout, id) {
  if (!id) return null;
  for (const item of layout) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

function deepCloneWithNewIds(item) {
  return {
    ...item,
    id: `${item.type}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    props: { ...item.props },
    children: (item.children || []).map(child => deepCloneWithNewIds(child)),
  };
}

function duplicateInLayout(layout, id) {
  let newId = null;
  const recurse = (items) => {
    const result = [];
    for (const item of items) {
      result.push({ ...item, children: item.children ? recurse(item.children) : [] });
      if (item.id === id) {
        const clone = deepCloneWithNewIds(item);
        newId = clone.id;
        result.push(clone);
      }
    }
    return result;
  };
  return { layout: recurse(layout), newId };
}

function updateLayoutWithNewChild(layout, parentId, newItem) {
  return layout.map(item => {
    if (item.id === parentId) {
      return { ...item, children: [...(item.children || []), newItem] };
    }
    if (item.children) {
      return { ...item, children: updateLayoutWithNewChild(item.children, parentId, newItem) };
    }
    return item;
  });
}

function removeItemFromLayout(layout, id) {
  return layout
    .filter(item => item.id !== id)
    .map(item => ({
      ...item,
      children: item.children ? removeItemFromLayout(item.children, id) : [],
    }));
}

function updateItemProps(layout, id, key, val) {
  return layout.map(item => {
    if (item.id === id) {
      return { ...item, props: { ...item.props, [key]: val } };
    }
    if (item.children) {
      return { ...item, children: updateItemProps(item.children, id, key, val) };
    }
    return item;
  });
}

function moveItemToParent(layout, itemId, parentId) {
  const item = findItemById(layout, itemId);
  if (!item) return layout;
  if (isAncestor(item, parentId)) return layout;
  let newLayout = removeItemFromLayout(layout, itemId);
  newLayout = updateLayoutWithNewChild(newLayout, parentId, item);
  return newLayout;
}

function isAncestor(item, targetId) {
  if (item.id === targetId) return true;
  if (item.children) {
    return item.children.some(child => isAncestor(child, targetId));
  }
  return false;
}

function reorderInLayout(layout, activeId, overId) {
  const rootActiveIdx = layout.findIndex(i => i.id === activeId);
  const rootOverIdx = layout.findIndex(i => i.id === overId);
  if (rootActiveIdx !== -1 && rootOverIdx !== -1) {
    return arrayMove(layout, rootActiveIdx, rootOverIdx);
  }
  return layout.map(item => {
    if (!item.children || item.children.length === 0) return item;
    const childActiveIdx = item.children.findIndex(c => c.id === activeId);
    const childOverIdx = item.children.findIndex(c => c.id === overId);
    if (childActiveIdx !== -1 && childOverIdx !== -1) {
      return { ...item, children: arrayMove(item.children, childActiveIdx, childOverIdx) };
    }
    return { ...item, children: reorderInLayout(item.children, activeId, overId) };
  });
}
