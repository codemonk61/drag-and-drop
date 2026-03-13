export default function Header({ props }) {
  const links = props.links ? props.links.split(',').map(s => s.trim()) : ['Home', 'Shop', 'Contact'];

  return (
    <header
      style={{ padding: `${props.padding}px 24px`, backgroundColor: props.bgColor, color: props.textColor }}
      className="w-full"
    >
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          {props.image && <img src={props.image} alt="Logo" className="h-8 w-auto" />}
          <span className="text-lg font-bold tracking-[0.2em] uppercase">{props.title || 'TRAFASA'}</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <span key={i} className="text-sm tracking-wide cursor-pointer hover:opacity-60 transition-opacity">{link}</span>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <svg className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <svg className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      </nav>
    </header>
  );
}
