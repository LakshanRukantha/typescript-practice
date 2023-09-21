import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  return NextResponse.json({ method: req.method, req_url: req.nextUrl });
};

export const POST = async (req: NextRequest) => {
  return NextResponse.json({ method: req.method, req_url: req.nextUrl });
};
