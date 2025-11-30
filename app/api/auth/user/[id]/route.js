import { NextResponse } from "next/server";
import User from "@/models/User";
import { databaseConnection } from "@/lib/db";

export async function GET(req, context) {
  const params = await context.params;  // await karna zaroori hai ab
  const { id } = params;


  await databaseConnection();

  const user = await User.findOne({ authId: id });

  if (user) {
    return NextResponse.json({ message: "User synced", user });
  }

  return NextResponse.json({ message: "User not found" }, { status: 404 });
}

export async function PUT(req, context) {
  const params = await context.params;  // await karna zaroori hai ab
  const { id } = params;
  const body = await req.json()


  await databaseConnection();

  const user = await User.findOneAndUpdate({ authId: id },
    {
      $set: {
        phone: body.phone,
        role: body.role
      }
    }, { new: true });

  if (user) {
    return NextResponse.json({ message: "User synced", user });
  }

  return NextResponse.json({ message: "User not found" }, { status: 404 });
}
