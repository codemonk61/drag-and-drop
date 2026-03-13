import { useState, useEffect, useCallback } from 'react';

export default function Carousel({ props, children }) {
  const slides = children ? (Array.isArray(children) ? children : [children]).filter(Boolean) : [];
  const [current, setCurrent] = useState(0);
  const total = slides.length || 1;
  const autoPlay = props.autoPlay !== false;
  const interval = (props.interval || 5) * 1000;

  const next = useCallback(() => setCurrent(i => (i + 1) % total), [total]);
  const prev = useCallback(() => setCurrent(i => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next, total]);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: props.bgColor || '#f0f0f0',
        borderRadius: `${props.borderRadius || 0}px`,
        minHeight: `${props.minHeight || 400}px`,
      }}
    >
      {/* Slides */}
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${current * 100}%)`,
          minHeight: `${props.minHeight || 400}px`,
        }}
      >
        {slides.length > 0 ? (
          slides.map((slide, i) => (
            <div key={i} style={{ minWidth: '100%', flexShrink: 0 }}>
              {slide}
            </div>
          ))
        ) : (
          <div
            style={{ minWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: `${props.minHeight || 400}px` }}
          >
            <div style={{ textAlign: 'center', color: '#999' }}>
              <svg style={{ width: 48, height: 48, margin: '0 auto 12px', opacity: 0.3 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p style={{ fontSize: 14 }}>Drop slides here</p>
            </div>
          </div>
        )}
      </div>

      {/* Arrows */}
      {props.showArrows !== false && total > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={{
              position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
              width: 40, height: 40, borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: '#333', zIndex: 5,
            }}
          >
            &#8249;
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              width: 40, height: 40, borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: '#333', zIndex: 5,
            }}
          >
            &#8250;
          </button>
        </>
      )}

      {/* Dots */}
      {props.showDots !== false && total > 1 && (
        <div style={{
          position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 8, zIndex: 5,
        }}>
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              style={{
                width: i === current ? 24 : 10, height: 10, borderRadius: 5,
                backgroundColor: i === current ? (props.dotActiveColor || '#f97316') : (props.dotColor || 'rgba(255,255,255,0.6)'),
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
