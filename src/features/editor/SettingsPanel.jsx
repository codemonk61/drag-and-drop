import { BLOCK_SETTINGS } from '../../utils/componentMap';
import useImageUpload from '../../hooks/useImageUpload';

export default function SettingsPanel({ item, updateProps, removeComponent, duplicateComponent }) {
  const { upload, isUploading } = useImageUpload();

  if (!item) {
    return (
      <aside className="w-[300px] flex-shrink-0 bg-white border-l flex items-center justify-center h-full">
        <div className="text-center text-gray-400 px-6">
          <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
          </svg>
          <p className="text-sm">Select a block to edit its properties</p>
        </div>
      </aside>
    );
  }

  const settings = BLOCK_SETTINGS[item.type] || [];
  const blockLabel = item.type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const handleImageUpload = async (key, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const result = await upload(file);
    if (result) {
      updateProps(item.id, key, result);
    }
  };

  return (
    <aside className="w-[300px] flex-shrink-0 bg-white border-l flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{blockLabel}</h3>
          <p className="text-[11px] text-gray-400 mt-0.5">{item.id}</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => duplicateComponent(item.id)}
            className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            title="Duplicate"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={() => removeComponent(item.id)}
            className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {settings.map(setting => (
          <SettingField
            key={setting.key}
            setting={setting}
            value={item.props[setting.key]}
            onChange={(val) => updateProps(item.id, setting.key, val)}
            onImageUpload={(e) => handleImageUpload(setting.key, e)}
            isUploading={isUploading}
          />
        ))}
      </div>
    </aside>
  );
}

function SettingField({ setting, value, onChange, onImageUpload, isUploading }) {
  const { label, type, min, max, step, options } = setting;

  return (
    <div>
      <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>

      {type === 'text' && (
        <input
          type="text"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all bg-gray-50"
        />
      )}

      {type === 'textarea' && (
        <textarea
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all resize-none bg-gray-50"
        />
      )}

      {type === 'color' && (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value || '#000000'}
            onChange={e => onChange(e.target.value)}
            className="w-8 h-8 rounded border border-gray-200 cursor-pointer p-0.5"
          />
          <input
            type="text"
            value={value || '#000000'}
            onChange={e => onChange(e.target.value)}
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400 bg-gray-50 font-mono"
          />
        </div>
      )}

      {type === 'range' && (
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={min}
            max={max}
            step={step || 1}
            value={value || min}
            onChange={e => onChange(Number(e.target.value))}
            className="flex-1 accent-blue-500"
          />
          <span className="text-xs text-gray-500 w-10 text-right tabular-nums">{value}</span>
        </div>
      )}

      {type === 'select' && (
        <select
          value={value || options[0]}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400 bg-gray-50"
        >
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}

      {type === 'toggle' && (
        <button
          onClick={() => onChange(!value)}
          className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-blue-500' : 'bg-gray-200'}`}
          role="switch"
          aria-checked={!!value}
        >
          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
      )}

      {type === 'image' && (
        <div>
          {value && (
            <div className="relative mb-2 rounded-lg overflow-hidden bg-gray-100">
              <img src={value} alt="" className="w-full h-24 object-cover" />
              <button
                onClick={() => onChange(null)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-black/80"
                aria-label="Remove image"
              >
                x
              </button>
            </div>
          )}
          <label className={`flex items-center justify-center gap-2 px-3 py-2.5 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                <span className="text-xs text-gray-500">Uploading...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="text-xs text-gray-500">{value ? 'Replace image' : 'Upload image'}</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={onImageUpload} className="hidden" disabled={isUploading} />
          </label>
        </div>
      )}
    </div>
  );
}
