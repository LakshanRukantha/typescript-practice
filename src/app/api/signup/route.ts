import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  return NextResponse.json(
    { message: "You are registered!", data: req.body },
    { status: 201 }
  );
};
