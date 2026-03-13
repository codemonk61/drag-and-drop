/**
 * API Service Layer for Storefront Builder
 *
 * ARCHITECTURE:
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                     SELLER DASHBOARD                            │
 * │  ┌──────────┐   ┌──────────┐   ┌───────────────────────────┐  │
 * │  │ Sidebar   │   │ Canvas   │   │ Settings Panel            │  │
 * │  │ (blocks)  │   │ (editor) │   │ (props + image upload)    │  │
 * │  └──────────┘   └────┬─────┘   └───────────────────────────┘  │
 * │                      │                                         │
 * │              ┌───────▼────────┐                                │
 * │              │  Layout JSON   │  ← No base64 images!          │
 * │              │  (lightweight) │    Only CDN URLs               │
 * │              └───────┬────────┘                                │
 * └──────────────────────┼────────────────────────────────────────┘
 *                        │
 *          ┌─────────────▼─────────────┐
 *          │     BACKEND API           │
 *          │                           │
 *          │  POST /api/storefront     │  ← Save layout JSON
 *          │  GET  /api/storefront/:id │  ← Get layout for viewer
 *          │  POST /api/upload         │  ← Upload image → CDN URL
 *          │  PUT  /api/storefront     │  ← Publish (draft → live)
 *          │                           │
 *          └─────────────┬─────────────┘
 *                        │
 *     ┌──────────────────┼──────────────────┐
 *     │                  │                  │
 *  ┌──▼───┐      ┌──────▼──────┐    ┌─────▼─────┐
 *  │  DB  │      │  S3 / CDN   │    │  Cache     │
 *  │      │      │  (images)   │    │  (Redis)   │
 *  └──────┘      └─────────────┘    └───────────┘
 *
 *
 * DATABASE SCHEMA (recommended):
 *
 *  storefronts
 *  ├── id            UUID PRIMARY KEY
 *  ├── seller_id     UUID FK → sellers.id
 *  ├── layout_json   JSONB           ← The layout tree
 *  ├── status        ENUM('draft', 'published')
 *  ├── version       INTEGER         ← Auto-increment on save
 *  ├── published_at  TIMESTAMP
 *  ├── created_at    TIMESTAMP
 *  └── updated_at    TIMESTAMP
 *
 *  storefront_assets
 *  ├── id            UUID PRIMARY KEY
 *  ├── seller_id     UUID FK → sellers.id
 *  ├── url           TEXT            ← CDN URL
 *  ├── file_name     TEXT
 *  ├── file_size     INTEGER
 *  ├── mime_type     TEXT
 *  └── created_at    TIMESTAMP
 */

// Configure your API base URL here
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Get auth token from your auth system.
 * Replace this with your actual auth token retrieval.
 */
function getAuthHeaders() {
  const token = localStorage.getItem('auth_token') || '';
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
}

/**
 * Save storefront layout (auto-save draft)
 * POST /api/storefront
 * Body: { layout: [...], status: 'draft' }
 */
export async function saveStorefrontLayout(layout) {
  const res = await fetch(`${API_BASE}/storefront`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ layout, status: 'draft' }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to save layout');
  }

  return res.json(); // { id, version, updatedAt }
}

/**
 * Publish storefront (make draft live)
 * PUT /api/storefront/publish
 */
export async function publishStorefront() {
  const res = await fetch(`${API_BASE}/storefront/publish`, {
    method: 'PUT',
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to publish');
  }

  return res.json(); // { id, status: 'published', publishedAt }
}

/**
 * Load storefront layout for editing (seller's own)
 * GET /api/storefront
 */
export async function loadStorefrontLayout() {
  const res = await fetch(`${API_BASE}/storefront`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    if (res.status === 404) return null; // No layout yet
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to load layout');
  }

  return res.json(); // { id, layout: [...], status, version, updatedAt }
}

/**
 * Load a PUBLIC storefront for visitors (no auth needed)
 * GET /api/storefront/:sellerId/public
 */
export async function loadPublicStorefront(sellerId) {
  const res = await fetch(`${API_BASE}/storefront/${sellerId}/public`);

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to load storefront');
  }

  return res.json(); // { layout: [...], sellerName, ... }
}

/**
 * Upload an image to the server/CDN.
 * Returns a URL string (not base64).
 *
 * POST /api/upload
 * Body: FormData with 'file' field
 * Response: { url: "https://cdn.example.com/images/abc123.jpg" }
 */
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('auth_token') || '';
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to upload image');
  }

  const data = await res.json();
  return data.url; // CDN URL like "https://cdn.trafasa.com/storefront/abc123.jpg"
}

/**
 * Delete an uploaded asset
 * DELETE /api/upload/:assetId
 */
export async function deleteAsset(assetUrl) {
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
    body: JSON.stringify({ url: assetUrl }),
  });

  if (!res.ok) {
    throw new Error('Failed to delete asset');
  }
}
