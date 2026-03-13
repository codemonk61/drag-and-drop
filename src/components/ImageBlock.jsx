export default function ImageBlock({ props }) {
  return (
    <div style={{ padding: `${props.padding}px`, backgroundColor: props.bgColor }}>
      {props.image ? (
        <img
          src={props.image}
          alt={props.alt || 'Image'}
          style={{
            aspectRatio: props.aspectRatio === 'auto' ? undefined : props.aspectRatio,
            objectFit: props.objectFit,
            borderRadius: `${props.borderRadius}px`,
          }}
          className="w-full block"
        />
      ) : (
        <div
          style={{
            aspectRatio: props.aspectRatio === 'auto' ? '16/9' : props.aspectRatio,
            borderRadius: `${props.borderRadius}px`,
          }}
          className="w-full bg-gray-100 flex items-center justify-center"
        >
          <div className="text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">Upload an image</span>
          </div>
        </div>
      )}
    </div>
  );
}
