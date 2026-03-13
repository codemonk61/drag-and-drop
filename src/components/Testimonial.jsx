export default function Testimonial({ props, children }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < props.rating);

  return (
    <div
      style={{ padding: `${props.padding}px`, backgroundColor: props.bgColor, color: props.textColor }}
      className="text-center"
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center gap-1 mb-6">
          {stars.map((filled, i) => (
            <svg key={i} className="w-5 h-5" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={filled ? 0 : 1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          ))}
        </div>
        <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-8 italic">
          {props.quote}
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          {props.image && (
            <img src={props.image} alt={props.author} className="w-12 h-12 rounded-full object-cover" />
          )}
          <div>
            <div className="font-semibold">{props.author}</div>
            <div className="text-sm opacity-60">{props.role}</div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
