import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { createToken } from "@/lib/auth";

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const {
      email,
      password,
    } = await req.json();

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const valid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!valid) {
      return NextResponse.json(
        {
          message:
            "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const token =
      createToken({
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      });

    return NextResponse.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "Login failed",
      },
      {
        status: 500,
      }
    );
  }
}