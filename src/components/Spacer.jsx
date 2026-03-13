export default function Spacer({ props }) {
  return (
    <div style={{ height: `${props.height}px`, backgroundColor: props.bgColor }} />
  );
}
