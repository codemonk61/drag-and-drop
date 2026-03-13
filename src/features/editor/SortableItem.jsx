import { useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { COMPONENT_MAP, CONTAINER_TYPES } from '../../utils/componentMap';

export default function SortableItem({
  id, item, isSelected, onSelect, removeComponent, duplicateComponent, updateProps,
  allCallbacks,
  depth = 0,
  selectedId,
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: { type: 'canvas-block', item, depth },
  });
  const Component = COMPONENT_MAP[item.type];
  const isContainer = CONTAINER_TYPES.has(item.type);
  const children = item.children || [];

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.4 : 1,
    width: item.props.blockWidth < 100 ? `${item.props.blockWidth}%` : '100%',
    maxWidth: item.props.blockMaxWidth < 1400 ? `${item.props.blockMaxWidth}px` : undefined,
    minHeight: item.props.blockMinHeight > 0 ? `${item.props.blockMinHeight}px` : undefined,
    margin: item.props.blockWidth < 100 ? '0 auto' : undefined,
  };

  const blockLabel = item.type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const cb = allCallbacks || { onSelect, removeComponent, duplicateComponent, updateProps };

  // For containers: render the component wrapper with children inside
  // For Carousel: in editor, show slides stacked (not as slider) so they can be arranged
  // For non-containers: render the component directly
  const renderContent = () => {
    if (isContainer) {
      if (item.type === 'CAROUSEL') {
        // Editor mode: show slides stacked vertically with a label
        return (
          <div style={{ backgroundColor: item.props.bgColor || '#f0f4ff', borderRadius: `${item.props.borderRadius || 0}px`, padding: 8 }}>
            <div style={{ fontSize: 11, color: '#888', fontWeight: 600, padding: '4px 8px', marginBottom: 4 }}>
              CAROUSEL ({children.length} slide{children.length !== 1 ? 's' : ''})
            </div>
            <NestedDropZone
              parentId={id}
              parentType={item.type}
              childItems={children}
              selectedId={selectedId}
              allCallbacks={cb}
              depth={depth}
            />
          </div>
        );
      }
      return (
        <Component props={item.props}>
          <NestedDropZone
            parentId={id}
            parentType={item.type}
            childItems={children}
            selectedId={selectedId}
            allCallbacks={cb}
            depth={depth}
            columns={item.props.columns}
          />
        </Component>
      );
    }
    return (
      <div className="pointer-events-none">
        <Component props={item.props} />
      </div>
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group/block-${depth}`}
      onClick={(e) => { e.stopPropagation(); cb.onSelect(id); }}
    >
      {/* Selection outline */}
      <div className={`absolute inset-0 pointer-events-none z-10 transition-all duration-150 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : ''
      }`}
        style={{ display: isSelected ? 'block' : 'none' }}
      />

      {/* Top toolbar */}
      <div
        className="absolute -top-7 left-0 right-0 flex items-center justify-between z-20"
        style={{ display: isSelected ? 'flex' : 'none' }}
      >
        <div className="flex items-center gap-1">
          <div
            {...attributes}
            {...listeners}
            className="flex items-center gap-1.5 bg-blue-500 text-white px-2 py-0.5 text-[10px] font-medium cursor-grab active:cursor-grabbing rounded-t"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
            {blockLabel}
            {depth > 0 && <span className="opacity-60 ml-1">(nested)</span>}
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            onClick={(e) => { e.stopPropagation(); cb.duplicateComponent(id); }}
            className="bg-gray-800 text-white p-1 hover:bg-gray-700 transition-colors rounded-t"
            title="Duplicate"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); cb.removeComponent(id); }}
            className="bg-gray-800 text-red-400 p-1 hover:bg-red-600 hover:text-white transition-colors rounded-t"
            title="Remove"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {renderContent()}

      {/* Resize handles (only when selected) */}
      {isSelected && cb.updateProps && (
        <ResizeHandle item={item} updateProps={cb.updateProps} />
      )}
    </div>
  );
}

function NestedDropZone({ parentId, parentType, childItems, selectedId, allCallbacks, depth, columns }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-${parentId}`,
    data: { type: 'nested-container', parentId },
  });

  // Grid layout for GRID type containers
  const isGrid = parentType === 'GRID';
  const layoutStyle = isGrid
    ? { display: 'grid', gridTemplateColumns: `repeat(${columns || 3}, 1fr)`, gap: '16px' }
    : {};

  return (
    <div
      ref={setNodeRef}
      className={`relative transition-all min-h-[50px] ${isOver ? 'bg-blue-50/60 ring-2 ring-blue-300 ring-inset rounded' : ''}`}
      style={layoutStyle}
      onClick={(e) => e.stopPropagation()}
    >
      {childItems.length === 0 && (
        <div
          className={`flex items-center justify-center h-[50px] border-2 border-dashed rounded-lg pointer-events-none ${
            isOver ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
          }`}
          style={isGrid ? { gridColumn: '1 / -1' } : {}}
        >
          <span className={`text-[11px] ${isOver ? 'text-blue-500 font-medium' : 'text-gray-400'}`}>
            {isOver ? 'Release to add here' : 'Drop blocks here'}
          </span>
        </div>
      )}
      <SortableContext items={childItems.map(c => c.id)} strategy={verticalListSortingStrategy}>
        {childItems.map(child => (
          <SortableItem
            key={child.id}
            id={child.id}
            item={child}
            isSelected={selectedId === child.id}
            selectedId={selectedId}
            allCallbacks={allCallbacks}
            depth={depth + 1}
          />
        ))}
      </SortableContext>
    </div>
  );
}

function ResizeHandle({ item, updateProps }) {
  const startResize = useCallback((e, direction) => {
    e.stopPropagation();
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = item.props.blockWidth || 100;
    const startHeight = item.props.blockMinHeight || 0;
    const el = e.target.closest('[style]');
    const parentWidth = el?.parentElement?.offsetWidth || 900;

    const onMove = (me) => {
      const dx = me.clientX - startX;
      const dy = me.clientY - startY;

      if (direction === 'right' || direction === 'corner') {
        const widthDelta = (dx / parentWidth) * 100;
        const newWidth = Math.max(20, Math.min(100, startWidth + widthDelta));
        updateProps(item.id, 'blockWidth', Math.round(newWidth));
      }
      if (direction === 'bottom' || direction === 'corner') {
        const newHeight = Math.max(0, startHeight + dy);
        updateProps(item.id, 'blockMinHeight', Math.round(newHeight));
      }
    };

    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [item, updateProps]);

  return (
    <>
      {/* Right edge */}
      <div
        className="absolute top-0 right-0 w-2 h-full cursor-ew-resize z-30 hover:bg-blue-400/30 transition-colors"
        onMouseDown={(e) => startResize(e, 'right')}
      />
      {/* Bottom edge */}
      <div
        className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize z-30 hover:bg-blue-400/30 transition-colors"
        onMouseDown={(e) => startResize(e, 'bottom')}
      />
      {/* Corner */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-30 flex items-center justify-center"
        onMouseDown={(e) => startResize(e, 'corner')}
      >
        <svg className="w-3 h-3 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="20" cy="20" r="2.5" />
          <circle cx="20" cy="12" r="2" />
          <circle cx="12" cy="20" r="2" />
        </svg>
      </div>
    </>
  );
}
