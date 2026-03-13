import { useState, useEffect } from 'react';
import { loadPublicStorefront } from '../services/api';
import StorefrontRenderer from '../features/preview/StorefrontRenderer';

/**
 * PUBLIC STOREFRONT PAGE
 *
 * This is the page visitors see when they go to a seller's storefront.
 * It fetches the published layout JSON from the API and renders it.
 *
 * Route: /store/:sellerId
 *
 * Usage with React Router:
 *   <Route path="/store/:sellerId" element={<PublicStorefront />} />
 *
 * Or pass sellerId as a prop:
 *   <PublicStorefront sellerId="abc-123" />
 */
export default function PublicStorefront({ sellerId }) {
  const [layout, setLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sellerId) {
      setError('No store ID provided');
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchLayout() {
      try {
        setLoading(true);
        const data = await loadPublicStorefront(sellerId);

        if (cancelled) return;

        if (!data || !data.layout) {
          setError('This store has not been set up yet');
          return;
        }

        setLayout(data.layout);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load store');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchLayout();

    return () => { cancelled = true; };
  }, [sellerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-400">Loading storefront...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6">
          <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h1 className="text-lg font-semibold text-gray-700 mb-1">Store not available</h1>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return <StorefrontRenderer layout={layout} />;
}
