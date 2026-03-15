export default function CollectionList({ props }) {
  let collections = [];
  try { collections = JSON.parse(props.collections); } catch { collections = []; }

  return (
    <div style={{ padding: `${props.padding}px`, backgroundColor: props.bgColor, color: props.textColor }}>
      <div className="max-w-6xl mx-auto">
        {props.title && <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{props.title}</h2>}
        <div className="collection-grid-responsive" style={{ '--cols': props.columns || 3 }}>
          {collections.map((col, i) => {
            const Wrapper = col.link ? 'a' : 'div';
            const wrapperProps = col.link
              ? { href: col.link, style: { textDecoration: 'none', color: 'inherit', display: 'block' } }
              : {};
            return (
              <Wrapper key={i} {...wrapperProps} className="group cursor-pointer relative overflow-hidden">
                <div className="aspect-[3/4] bg-gray-100">
                  {col.image ? (
                    <img src={col.image} alt={col.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200" />
                  )}
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-end p-6">
                  <h3 className="text-white text-lg font-semibold tracking-wide">{col.name}</h3>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}
