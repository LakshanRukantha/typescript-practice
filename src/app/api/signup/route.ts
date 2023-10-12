import connectDB from "@/libs/dbConnection";
import UserModel from "@/schemas/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

type RegistrationBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const avatarBaseURL = process.env.AVATAR_BASE_URL as string;

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

    // Revalidate first and last name
    const nameRegex = /^[a-zA-Z]+$/;

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      return NextResponse.json(
        { message: "First and last name must consist of letters only." },
        { status: 400 }
      );
    }

    // Revalidate email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 }
      );
    }

    // Revalidate password
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

    // Generate a salt for the password
    const salt = await bcrypt.genSalt(10);

    // Finalize the values to be saved to the database
    const finalFirstName = firstName.replace(/\s/g, "");
    const finalLastName = lastName.replace(/\s/g, "");
    const finalEmail = email.toLocaleLowerCase().replace(/\s/g, "");
    const finalPassword = await bcrypt.hash(password, salt); // Hash the password for security
    const finalAvatar = `${avatarBaseURL}${finalFirstName}+${finalLastName}`;

    // Save the user to the database
    const user = await UserModel.create({
      firstName: finalFirstName,
      lastName: finalLastName,
      email: finalEmail,
      password: finalPassword,
      avatar: finalAvatar,
      method: "email",
    });

    // Check if the user was saved successfully or not
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
