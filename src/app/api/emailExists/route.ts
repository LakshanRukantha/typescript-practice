import connectDB from "@/libs/dbConnection";
import UserModel from "@/schemas/UserSchema";
import { NextRequest, NextResponse } from "next/server";

connectDB(); // Call outside of handler to prevent repeated connections on each request

export const POST = async (req: NextRequest) => {
  try {
    // Destructure email from request body
    const { email } = (await req.json()) as { email: string };

    // Check if email is provided and exists
    if (email) {
      // Check if email exists
      const emailExists = await UserModel.exists({ email });
      if (!emailExists) {
        return NextResponse.json({
          exist: false,
          message: "Email does not exist",
        });
      } else {
        return NextResponse.json(
          { exist: true, message: "Email already exists" },
          { status: 200 }
        );
      }
    } else {
      // Email is required
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
