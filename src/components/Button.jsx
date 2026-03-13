export default function Button({ props }) {
  const buttonEl = (
    <button
      style={{
        backgroundColor: props.bgColor,
        color: props.textColor,
        padding: `${props.paddingY}px ${props.paddingX}px`,
        borderRadius: `${props.borderRadius}px`,
        border: props.borderWidth ? `${props.borderWidth}px solid ${props.borderColor}` : 'none',
        fontSize: `${props.fontSize}px`,
        fontWeight: props.fontWeight,
        width: props.fullWidth ? '100%' : 'auto',
        letterSpacing: '0.1em',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
      }}
      className="transition-all hover:opacity-80 uppercase tracking-wide"
    >
      {props.text}
      {props.showArrow && (
        <span style={{
          width: 20, height: 20, borderRadius: '50%', border: '1.5px solid currentColor',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
        }}>
          &#8250;
        </span>
      )}
    </button>
  );

  return (
    <div style={{ display: 'flex', justifyContent: props.align || 'center', padding: '8px 0' }}>
      {props.link ? (
        <a href={props.link} target={props.openNewTab ? '_blank' : '_self'} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          {buttonEl}
        </a>
      ) : buttonEl}
    </div>
  );
}
