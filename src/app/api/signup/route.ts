import connectDB from "@/app/libs/dbConnection";
import UserModel from "@/app/schemas/UserSchema";
import { NextRequest, NextResponse } from "next/server";

type RegistrationBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const POST = async (req: NextRequest) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } =
      (await req.json()) as RegistrationBody;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match." },
        { status: 400 }
      );
    }

    await connectDB();

    const emailExists = await UserModel.exists({ email });

    if (emailExists) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 400 }
      );
    }

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    if (!user) {
      return NextResponse.json(
        { message: "Registration failed." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Registration successful." },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
};
