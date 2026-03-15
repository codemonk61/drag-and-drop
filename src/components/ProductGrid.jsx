export default function ProductGrid({ props }) {
  let products = [];
  try { products = JSON.parse(props.products); } catch { products = []; }

  return (
    <div style={{ padding: `${props.padding}px`, backgroundColor: props.bgColor, color: props.textColor }}>
      <div className="max-w-6xl mx-auto">
        {props.title && <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">{props.title}</h2>}
        {props.subtitle && <p className="text-center text-sm opacity-60 mb-10">{props.subtitle}</p>}
        <div className="product-grid-responsive" style={{ '--cols': props.columns || 4 }}>
          {products.map((product, i) => {
            const Wrapper = product.link ? 'a' : 'div';
            const wrapperProps = product.link
              ? { href: product.link, target: product.openNewTab ? '_blank' : '_self', rel: product.openNewTab ? 'noopener noreferrer' : undefined, style: { textDecoration: 'none', color: 'inherit' } }
              : {};
            return (
              <Wrapper key={i} {...wrapperProps} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden rounded">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <svg className="w-10 h-10 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-sm">{product.name}</h3>
                <p className="text-sm mt-1 opacity-70">{product.price}</p>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}
