export default function TextBlock({ props }) {
  return (
    <div
      style={{
        padding: `${props.padding}px`,
        backgroundColor: props.bgColor,
        color: props.textColor,
      }}
    >
      <p
        style={{
          fontSize: `${props.fontSize}px`,
          fontWeight: props.fontWeight,
          textAlign: props.textAlign,
          lineHeight: props.lineHeight,
        }}
        className="max-w-3xl mx-auto"
      >
        {props.content}
      </p>
    </div>
  );
}
