import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const {
      name,
      email,
      password,
    } = await req.json();

    const exists =
      await User.findOne({
        email,
      });

    if (exists) {
      return NextResponse.json(
        {
          message:
            "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
      });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Registration failed",
      },
      {
        status: 500,
      }
    );
  }
}