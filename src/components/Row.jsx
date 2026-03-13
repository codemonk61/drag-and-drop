export default function Row({ props, children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: `${props.gap || 16}px`,
        padding: `${props.padding || 20}px`,
        backgroundColor: props.bgColor || '#ffffff',
        alignItems: props.alignItems || 'stretch',
        justifyContent: props.justifyContent || 'flex-start',
        flexWrap: props.wrap ? 'wrap' : 'nowrap',
        borderRadius: `${props.borderRadius || 0}px`,
        minHeight: '60px',
      }}
    >
      {children}
    </div>
  );
}
