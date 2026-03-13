export default function Divider({ props }) {
  return (
    <div style={{ padding: `${props.padding}px`, backgroundColor: props.bgColor }} className="flex justify-center">
      <hr
        style={{
          borderColor: props.lineColor,
          borderWidth: `${props.lineWidth}px`,
          borderStyle: props.lineStyle,
          width: `${props.width}%`,
        }}
        className="border-0 border-t"
      />
    </div>
  );
}
