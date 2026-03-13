export default function Grid({ props, children }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${props.columns || 3}, 1fr)`,
        gap: `${props.gap || 16}px`,
        padding: `${props.padding || 20}px`,
        backgroundColor: props.bgColor || '#ffffff',
        borderRadius: `${props.borderRadius || 0}px`,
        minHeight: '60px',
      }}
    >
      {props.title && (
        <h2
          style={{
            gridColumn: '1 / -1',
            color: props.textColor || '#1a1a1a',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          {props.title}
        </h2>
      )}
      {children}
    </div>
  );
}
