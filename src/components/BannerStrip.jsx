export default function BannerStrip({ props }) {
  return (
    <div
      style={{
        padding: `${props.padding}px`,
        backgroundColor: props.bgColor,
        color: props.textColor,
        fontSize: `${props.fontSize}px`,
        fontWeight: props.fontWeight,
      }}
      className="text-center tracking-widest"
    >
      {props.text}
    </div>
  );
}
