export default function HeroBanner({ props, children }) {
  const hasImage = !!props.image;

  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        padding: `${props.padding}px 24px`,
        backgroundColor: props.bgColor,
        color: props.textColor,
        minHeight: '500px',
        textAlign: props.textAlign || 'center',
      }}
    >
      {hasImage && (
        <>
          <img src={props.image} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(0,0,0,${(props.overlayOpacity || 0) / 100})` }}
          />
        </>
      )}
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-tight">
          {props.title}
        </h1>
        {props.subtitle && (
          <p className="text-base md:text-lg opacity-70 mb-10 max-w-lg mx-auto leading-relaxed">
            {props.subtitle}
          </p>
        )}
        {props.buttonText && (
          <button
            style={{ backgroundColor: props.buttonBg, color: props.buttonColor }}
            className="px-10 py-4 text-sm font-medium tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
          >
            {props.buttonText}
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
