import { NextResponse } from "next/server";
import { getUploadUrl } from "@/lib/r2";

export async function POST(request) {
  try {
    const { fileName, contentType } = await request.json();
    const fileKey = `uploads/${Date.now()}-${fileName}`;

    const data = await getUploadUrl(fileKey, contentType);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
