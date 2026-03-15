export default function InfoCard({ props }) {
  const cardContent = (
    <>
      {/* Image */}
      <div style={{ aspectRatio: props.aspectRatio || '4/3', backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
        {props.image ? (
          <img
            src={props.image}
            alt={props.title || ''}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ width: 40, height: 40, opacity: 0.2 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      {/* Bottom */}
      <div style={{ padding: `${props.padding || 16}px`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: props.textColor || '#1a1a1a', fontWeight: 600, fontSize: `${props.fontSize || 14}px` }}>
          {props.title || 'Card Title'}
        </span>
        {props.showArrow !== false && (
          <span
            style={{
              width: 28, height: 28, borderRadius: '50%', border: '1.5px solid currentColor',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: props.textColor || '#1a1a1a', fontSize: 14, flexShrink: 0,
            }}
          >
            &#8250;
          </span>
        )}
      </div>
    </>
  );

  const style = {
    backgroundColor: props.bgColor || '#ffffff',
    borderRadius: `${props.borderRadius || 12}px`,
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
  };

  if (props.link) {
    return (
      <a href={props.link} style={style} className="hover:shadow-lg hover:-translate-y-0.5">
        {cardContent}
      </a>
    );
  }

  return (
    <div style={style} className="hover:shadow-lg hover:-translate-y-0.5">
      {cardContent}
    </div>
  );
}
