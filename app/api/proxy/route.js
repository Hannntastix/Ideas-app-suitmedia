import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) return new NextResponse("Missing URL", { status: 400 });

    const res = await fetch(url);
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
        headers: {
            "Content-Type": res.headers.get("content-type") || "image/jpeg",
            "Cache-Control": "public, max-age=86400"
        }
    });
}