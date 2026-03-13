export default function ImageWithText({ props, children }) {
  const imageLeft = props.imagePosition === 'left';

  return (
    <div style={{ padding: `${props.padding}px`, backgroundColor: props.bgColor, color: props.textColor }}>
      <div className="max-w-6xl mx-auto">
        <div className={`grid md:grid-cols-2 gap-12 items-center`}>
          <div className={imageLeft ? '' : 'md:order-2'}>
            {props.image ? (
              <img src={props.image} alt={props.title} className="w-full h-auto object-cover" />
            ) : (
              <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          <div className={imageLeft ? '' : 'md:order-1'}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{props.title}</h2>
            <p className="opacity-70 leading-relaxed mb-8">{props.description}</p>
            {props.buttonText && (
              <button
                style={{ backgroundColor: props.buttonBg, color: props.buttonColor }}
                className="px-8 py-3.5 text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
              >
                {props.buttonText}
              </button>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
