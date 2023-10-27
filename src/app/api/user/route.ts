import connectDB from "@/libs/dbConnection";
import UserModel from "@/schemas/UserSchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email } = (await req.json()) as { email: string };

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }
  await connectDB();
  const user = await UserModel.findOne({ email });

  // return user data without passsword in db to prevent security fault update
  if (user) {
    return NextResponse.json(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
};
