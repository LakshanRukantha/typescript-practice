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
    if (
      firstName &&
      lastName &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      // save to database
      console.log("First Name: ", firstName);
      console.log("Last Name: ", lastName);
      console.log("Email: ", email);
      console.log("Password: ", password);
      console.log("Confirm Password: ", confirmPassword);

      return NextResponse.json(
        { message: "Registration Successful!" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Registration Failed!" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
};
