import { COMPONENT_MAP, CONTAINER_TYPES } from '../../utils/componentMap';

export default function StorefrontRenderer({ layout }) {
  if (!layout || layout.length === 0) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400 text-sm">No content to preview</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      {layout.map(item => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function RenderItem({ item }) {
  const Comp = COMPONENT_MAP[item.type];
  if (!Comp) return null;

  try {
    if (CONTAINER_TYPES.has(item.type) && item.children && item.children.length > 0) {
      return (
        <Comp props={item.props}>
          {item.children.map(child => (
            <RenderItem key={child.id} item={child} />
          ))}
        </Comp>
      );
    }

    return <Comp props={item.props} />;
  } catch {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded m-2">
        Failed to render {item.type} block
      </div>
    );
  }
}
