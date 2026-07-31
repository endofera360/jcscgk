import { put } from '@vercel/blob';

// Disable default body parser so we can stream the raw file directly
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the filename from the URL query string
    const rawFilename = req.query.filename || 'upload.bin';
    const filename = `uploads/${Date.now()}-${rawFilename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    // Pass the raw request stream (req) directly to Vercel Blob
    const blob = await put(filename, req, {
      access: 'public',
    });

    return res.status(200).json({ url: blob.url });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Upload failed' });
  }
}
