export default function Section({ props, children }) {
  return (
    <section
      style={{
        padding: `${props.padding}px 24px`,
        backgroundColor: props.bgColor,
        color: props.textColor,
        textAlign: props.textAlign || 'center',
      }}
    >
      <div className="max-w-3xl mx-auto">
        {props.title && <h2 className="text-2xl md:text-3xl font-bold mb-4">{props.title}</h2>}
        {props.description && <p className="leading-relaxed opacity-70">{props.description}</p>}
      </div>
      {children}
    </section>
  );
}
