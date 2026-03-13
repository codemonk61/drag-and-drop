export default function Column({ props, children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: `${props.gap || 12}px`,
        padding: `${props.padding || 16}px`,
        backgroundColor: props.bgColor || 'transparent',
        alignItems: props.alignItems || 'stretch',
        justifyContent: props.justifyContent || 'flex-start',
        flex: props.flex || '1 1 0%',
        borderRadius: `${props.borderRadius || 0}px`,
        border: props.showBorder ? `1px solid ${props.borderColor || '#e5e7eb'}` : 'none',
        minHeight: '40px',
      }}
    >
      {children}
    </div>
  );
}
