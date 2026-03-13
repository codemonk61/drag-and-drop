import { COMPONENT_MAP, CONTAINER_TYPES } from '../../utils/componentMap';

export default function StorefrontRenderer({ layout }) {
  return (
    <div className="w-full min-h-screen bg-white">
      {layout.map(item => renderItem(item))}
    </div>
  );
}

function renderItem(item) {
  const Comp = COMPONENT_MAP[item.type];
  if (!Comp) return null;

  if (CONTAINER_TYPES.has(item.type) && item.children && item.children.length > 0) {
    return (
      <Comp key={item.id} props={item.props}>
        {item.children.map(child => renderItem(child))}
      </Comp>
    );
  }

  return <Comp key={item.id} props={item.props} />;
}
