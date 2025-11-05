// /app/api/sync-user/route.js
import { NextResponse } from "next/server";
import User from "@/models/User";
import { databaseConnection } from "@/lib/db";



export async function POST(req) {
  await databaseConnection();
  const body = await req.json();

  const existing = await User.findOne({ clerkId: body.clerkId });

  if (!existing) {
    const newUser = await User.create({
      clerkId: body.clerkId,
      email: body.email,
      name: body.name,
      image: body.image,
    });

    return NextResponse.json({ message: "User synced", user: newUser });
  }

  return NextResponse.json({ message: "User already exists" });
}


