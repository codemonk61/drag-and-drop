export default function Slide({ props, children }) {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: `${props.minHeight || 400}px`,
        backgroundColor: props.bgColor || '#f0f4ff',
        backgroundImage: props.image ? `url(${props.image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: props.verticalAlign || 'center',
        justifyContent: props.horizontalAlign || 'flex-start',
        padding: `${props.padding || 60}px`,
      }}
    >
      {/* Overlay */}
      {props.overlayOpacity > 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundColor: `rgba(0,0,0,${(props.overlayOpacity || 0) / 100})`,
        }} />
      )}
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
        {props.tag && (
          <span style={{
            display: 'inline-block', padding: '4px 16px', border: `1.5px solid ${props.textColor || '#1a1a1a'}`,
            borderRadius: 4, fontSize: 13, fontWeight: 500, color: props.textColor || '#1a1a1a',
            marginBottom: 16,
          }}>
            {props.tag}
          </span>
        )}
        {props.title && (
          <h2 style={{
            fontSize: `${props.titleSize || 48}px`, fontWeight: 900,
            color: props.textColor || '#1a1a1a', lineHeight: 1.1, marginBottom: 20,
            letterSpacing: '-0.02em',
          }}>
            {props.title}
          </h2>
        )}
        {props.description && (
          <p style={{
            fontSize: `${props.descSize || 16}px`, color: props.textColor || '#1a1a1a',
            opacity: 0.8, lineHeight: 1.6, marginBottom: 24,
          }}>
            {props.description}
          </p>
        )}
        {props.buttonText && (
          <a
            href={props.buttonLink || '#'}
            target={props.openNewTab ? '_blank' : '_self'}
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', backgroundColor: props.buttonBg || '#6366f1',
              color: props.buttonColor || '#ffffff', fontSize: 14, fontWeight: 600,
              borderRadius: 6, textDecoration: 'none', textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {props.buttonText}
          </a>
        )}
        {children}
      </div>
    </div>
  );
}
