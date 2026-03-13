export default function Footer({ props, children }) {
  const col1 = props.col1Links ? props.col1Links.split(',').map(s => s.trim()) : [];
  const col2 = props.col2Links ? props.col2Links.split(',').map(s => s.trim()) : [];
  const col3 = props.col3Links ? props.col3Links.split(',').map(s => s.trim()) : [];

  return (
    <footer style={{ padding: `${props.padding}px`, backgroundColor: props.bgColor, color: props.textColor }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <h3 className="text-xl font-bold tracking-wider mb-3">{props.brandName}</h3>
            <p className="text-sm opacity-60 max-w-xs">{props.description}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-50">{props.col1Title}</h4>
            <ul className="space-y-2.5">
              {col1.map((link, i) => (
                <li key={i} className="text-sm opacity-70 hover:opacity-100 cursor-pointer transition-opacity">{link}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-50">{props.col2Title}</h4>
            <ul className="space-y-2.5">
              {col2.map((link, i) => (
                <li key={i} className="text-sm opacity-70 hover:opacity-100 cursor-pointer transition-opacity">{link}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-50">{props.col3Title}</h4>
            <ul className="space-y-2.5">
              {col3.map((link, i) => (
                <li key={i} className="text-sm opacity-70 hover:opacity-100 cursor-pointer transition-opacity">{link}</li>
              ))}
            </ul>
          </div>
        </div>
        {children}
        <div className="border-t pt-6 text-xs opacity-40" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          {props.copyright}
        </div>
      </div>
    </footer>
  );
}
