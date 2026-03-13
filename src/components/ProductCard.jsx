export default function ProductCard({ props }) {
  return (
    <div
      style={{ backgroundColor: props.bgColor, color: props.textColor }}
      className="max-w-xs mx-auto group cursor-pointer"
    >
      <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden relative">
        {props.image ? (
          <img src={props.image} alt={props.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {props.badge && (
          <span className="absolute top-3 left-3 bg-black text-white text-[10px] px-2.5 py-1 uppercase tracking-widest font-medium">
            {props.badge}
          </span>
        )}
      </div>
      <h3 className="font-medium text-sm tracking-wide">{props.title}</h3>
      <div className="flex items-center gap-2 mt-1.5">
        <span className="text-sm">{props.price}</span>
        {props.comparePrice && (
          <span className="text-sm line-through opacity-40">{props.comparePrice}</span>
        )}
      </div>
    </div>
  );
}
