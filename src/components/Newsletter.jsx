export default function Newsletter({ props, children }) {
  return (
    <div
      style={{ padding: `${props.padding}px`, backgroundColor: props.bgColor, color: props.textColor }}
      className="text-center"
    >
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">{props.title}</h2>
        <p className="opacity-70 mb-8 text-sm">{props.subtitle}</p>
        <div className="flex gap-0">
          <input
            type="email"
            placeholder={props.inputPlaceholder}
            className="flex-1 px-5 py-3.5 text-sm outline-none"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: props.textColor,
              border: `1px solid rgba(255,255,255,0.2)`,
            }}
          />
          <button
            style={{ backgroundColor: props.buttonBg, color: props.buttonColor }}
            className="px-8 py-3.5 text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            {props.buttonText}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
