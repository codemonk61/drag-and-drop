export default function VideoBlock({ props }) {
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    return url;
  };

  const embedUrl = getEmbedUrl(props.url);

  return (
    <div style={{ padding: `${props.padding}px`, backgroundColor: props.bgColor, color: props.textColor }}>
      <div className="max-w-4xl mx-auto">
        {props.title && <h2 className="text-xl font-bold text-center mb-6">{props.title}</h2>}
        <div className="relative overflow-hidden bg-gray-900 rounded" style={{ aspectRatio: props.aspectRatio }}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={props.title}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-3 opacity-40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="text-sm opacity-50">Add a video URL</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
