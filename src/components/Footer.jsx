export default function Footer({ props, children }) {
  // Support "Label|URL" format: "Home|/,Shop|/shop" or just "Home,Shop"
  const parseLinks = (str) => {
    if (!str) return [];
    return str.split(',').map(s => {
      const parts = s.trim().split('|').map(p => p.trim());
      return { label: parts[0], url: parts[1] || '#' };
    });
  };

  const col1 = parseLinks(props.col1Links);
  const col2 = parseLinks(props.col2Links);
  const col3 = parseLinks(props.col3Links);

  return (
    <footer style={{ padding: `${props.padding}px`, backgroundColor: props.bgColor, color: props.textColor }}>
      <div className="max-w-6xl mx-auto">
        <div className="footer-grid-responsive mb-12">
          <div>
            <h3 className="text-xl font-bold tracking-wider mb-3">{props.brandName}</h3>
            <p className="text-sm opacity-60 max-w-xs">{props.description}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-50">{props.col1Title}</h4>
            <ul className="space-y-2.5">
              {col1.map((link, i) => (
                <li key={i}>
                  <a href={link.url} className="text-sm opacity-70 hover:opacity-100 transition-opacity" style={{ color: 'inherit', textDecoration: 'none' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-50">{props.col2Title}</h4>
            <ul className="space-y-2.5">
              {col2.map((link, i) => (
                <li key={i}>
                  <a href={link.url} className="text-sm opacity-70 hover:opacity-100 transition-opacity" style={{ color: 'inherit', textDecoration: 'none' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-50">{props.col3Title}</h4>
            <ul className="space-y-2.5">
              {col3.map((link, i) => (
                <li key={i}>
                  <a href={link.url} className="text-sm opacity-70 hover:opacity-100 transition-opacity" style={{ color: 'inherit', textDecoration: 'none' }}>
                    {link.label}
                  </a>
                </li>
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
