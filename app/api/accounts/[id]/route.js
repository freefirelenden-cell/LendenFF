import { databaseConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import Account from "@/models/Account";




// 🟢 GET - Fetch single account by ID
export async function GET(req, context) {
  try {
    await databaseConnection();
    const params = await context.params;
    const { id } = params
    const account = await Account.findById(id);

    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    return NextResponse.json(account, { status: 200 });
  } catch (error) {
    console.error("GET /api/accounts/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch account" }, { status: 500 });
  }
}

// 🟡 PUT - Update account by ID
export async function PUT(req, { params }) {
  try {
    await databaseConnection();
    const body = await req.json();

    const updatedAccount = await Account.findByIdAndUpdate(
      params.id,
      {
        $set: {
          title: body.title,
          rank: body.rank,
          price: body.price,
          description: body.description,
          uid: body.uid,
          email: body.email,
          password: body.password,
          stats: {
            level: body.level,
            matches: body.matches,
            kdr: body.kdr,
            badges: body.badges,
          },
          img: body.img || [],
        },
      },
      { new: true }
    );

    if (!updatedAccount) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Account updated successfully", account: updatedAccount },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/accounts/[id] error:", error);
    return NextResponse.json({ error: "Failed to update account" }, { status: 500 });
  }
}

// 🔴 DELETE - Remove account by ID
export async function DELETE(req, { params }) {
  try {
    await databaseConnection();
    const deleted = await Account.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/accounts/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
