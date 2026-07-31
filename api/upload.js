import { getUploadUrl } from "../lib/r2";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { fileName, contentType } = req.body;
    const fileKey = `uploads/${Date.now()}-${fileName}`;

    const result = await getUploadUrl(fileKey, contentType);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
