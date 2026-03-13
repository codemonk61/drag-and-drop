import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Auto-save hook with debounce.
 * Saves layout to backend after user stops editing for `delay` ms.
 * Also saves to localStorage as immediate fallback.
 *
 * Usage:
 *   const { saveStatus, lastSaved, forceSave } = useAutoSave(layout, saveFn, { delay: 2000 });
 *
 * saveStatus: 'idle' | 'saving' | 'saved' | 'error'
 */
export default function useAutoSave(layout, saveFn, { delay = 2000, enabled = true } = {}) {
  const [saveStatus, setSaveStatus] = useState('idle');
  const [lastSaved, setLastSaved] = useState(null);
  const timeoutRef = useRef(null);
  const layoutRef = useRef(layout);
  const isFirstRender = useRef(true);

  layoutRef.current = layout;

  // Always save to localStorage immediately (fast fallback)
  useEffect(() => {
    try {
      localStorage.setItem('store-layout', JSON.stringify(layout));
    } catch {
      // Quota exceeded — handled elsewhere
    }
  }, [layout]);

  // Debounced save to backend
  useEffect(() => {
    // Skip the initial render (loading from saved state)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!enabled || !saveFn) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setSaveStatus('idle');

    timeoutRef.current = setTimeout(async () => {
      try {
        setSaveStatus('saving');
        await saveFn(layoutRef.current);
        setSaveStatus('saved');
        setLastSaved(new Date());

        // Reset to idle after 3s
        setTimeout(() => setSaveStatus('idle'), 3000);
      } catch {
        setSaveStatus('error');
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [layout, saveFn, delay, enabled]);

  const forceSave = useCallback(async () => {
    if (!saveFn) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    try {
      setSaveStatus('saving');
      await saveFn(layoutRef.current);
      setSaveStatus('saved');
      setLastSaved(new Date());
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch {
      setSaveStatus('error');
    }
  }, [saveFn]);

  return { saveStatus, lastSaved, forceSave };
}
