import { useState, useEffect, useCallback } from 'react';
import { DndContext, DragOverlay, useDroppable, pointerWithin, rectIntersection } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import Sidebar from './features/editor/Sidebar';
import SortableItem from './features/editor/SortableItem';
import SettingsPanel from './features/editor/SettingsPanel';
import StorefrontRenderer from './features/preview/StorefrontRenderer';
import { INITIAL_PROPS, COMPONENT_MAP, CONTAINER_TYPES } from './utils/componentMap';

export default function App() {
  const [layout, setLayout] = useState(() => {
    try { return JSON.parse(localStorage.getItem('store-layout')) || []; }
    catch { return []; }
  });
  const [isPreview, setIsPreview] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [activeDragId, setActiveDragId] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Persist layout
  useEffect(() => {
    localStorage.setItem('store-layout', JSON.stringify(layout));
  }, [layout]);

  // Track history for undo
  const pushHistory = useCallback((newLayout) => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newLayout].slice(-30));
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setLayout(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setLayout(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
      if (e.key === 'Delete' && selectedId) {
        removeComponent(selectedId);
        setSelectedId(null);
      }
      if (e.key === 'Escape') setSelectedId(null);
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
  };

  const duplicateComponent = (id) => {
    setLayoutWithHistory(prev => {
      const result = duplicateInLayout(prev, id);
      if (result.newId) setSelectedId(result.newId);
      return result.layout;
    });
  };

  const updateProps = (id, key, val) => {
    setLayout(prev => updateItemProps(prev, id, key, val));
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

    // Resolve the target container ID if dropped on a drop-zone
    let targetParentId = null;
    if (overId.startsWith('drop-')) {
      targetParentId = overId.replace('drop-', '');
    } else if (overId !== 'canvas-droppable') {
      // Check if the over target is itself a container block
      const overItem = findItemById(layout, overId);
      if (overItem && CONTAINER_TYPES.has(overItem.type)) {
        targetParentId = overId;
      }
    }

    // --- FROM SIDEBAR ---
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

    // --- MOVE EXISTING CANVAS BLOCK ---
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

  // Find selected item recursively
  const selectedItem = findItemById(layout, selectedId);

  // Drag overlay preview
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

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top bar */}
      <header className="h-12 bg-[#16162a] text-white flex justify-between items-center px-5 flex-shrink-0 z-50">
        <div className="flex items-center gap-4">
          <span className="font-bold tracking-[0.2em] text-sm">TRAFASA</span>
          <span className="text-[10px] text-gray-500 font-medium px-2 py-0.5 bg-white/5 rounded">BUILDER</span>
        </div>

        <div className="flex items-center gap-2">
          {!isPreview && (
            <div className="flex items-center gap-1 mr-3">
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className="p-1.5 rounded hover:bg-white/10 disabled:opacity-20 transition-all"
                title="Undo (Ctrl+Z)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>
              <button
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="p-1.5 rounded hover:bg-white/10 disabled:opacity-20 transition-all"
                title="Redo (Ctrl+Shift+Z)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 10H11a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
                </svg>
              </button>
            </div>
          )}

          <button
            onClick={() => setIsPreview(!isPreview)}
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
        <main className="flex-1 overflow-y-auto">
          <StorefrontRenderer layout={layout} />
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
                      <CanvasEmpty />
                    ) : (
                      layout.map(item => (
                        <SortableItem
                          key={item.id}
                          id={item.id}
                          item={item}
                          isSelected={selectedId === item.id}
                          selectedId={selectedId}
                          onSelect={setSelectedId}
                          removeComponent={removeComponent}
                          duplicateComponent={duplicateComponent}
                          updateProps={updateProps}
                        />
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
    </div>
  );
}

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

function CanvasEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-8 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-400 mb-2">Start building your page</h3>
      <p className="text-sm text-gray-400 max-w-xs">
        Drag blocks from the left panel or double-click them to add to your page.
        Use Row, Column, and Grid containers to build complex layouts.
      </p>
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
