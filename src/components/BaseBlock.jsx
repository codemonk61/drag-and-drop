export default function BaseBlock({ settings, children }) {
  return (
    <div 
      style={{ 
        padding: `${settings.padding}px`, 
        backgroundColor: settings.bgColor, 
        color: settings.textColor 
      }} 
      className="w-full transition-all"
    >
      {settings.image && (
        <img src={settings.image} alt="Content" className="w-full h-auto mb-4 object-cover" />
      )}
      {children}
    </div>
  );
}