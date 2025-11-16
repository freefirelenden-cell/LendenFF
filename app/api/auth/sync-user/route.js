// /app/api/sync-user/route.js
import { NextResponse } from "next/server";
import User from "@/models/User";
import { databaseConnection } from "@/lib/db";



export async function POST(req) {
  await databaseConnection();
  const body = await req.json();

  const existing = await User.findOne({ authId: body.authId });

  if (!existing) {
    const newUser = new User({
      authId: body.authId,
      email: body.email,
      name: body.name,
      image: body.image,
    });
    await newUser.save();
    console.log(newUser)

    return NextResponse.json({ message: "User synced", data: body });
  }

  return NextResponse.json({ message: "User already exists" });
}


