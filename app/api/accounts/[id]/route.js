import { databaseConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import Account from "@/models/Account";




// 🟢 GET - Fetch single account by ID
export async function GET(req, context) {
  try {
    await databaseConnection();
    const params = await context.params;
    const { id } = params

    const searchParams = req.nextUrl.searchParams;
    const includePassword = searchParams.get("includePassword") === "true" ? "+password" : "";

    // ⭐ If includePassword = true → include password
    const account = await Account.findById(id).select(includePassword)

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
export async function PUT(req, context) {
  const { params } = await context;

  try {
    await databaseConnection();
    const body = await req.json();

    const updateFields = {};

    // sirf wahi field add karo jo user bheje
    if (body.title) updateFields.title = body.title;
    if (body.rank) updateFields.rank = body.rank;
    if (body.price) updateFields.price = body.price;
    if (body.description) updateFields.description = body.description;
    if (body.uid) updateFields.uid = body.uid;
    if (body.email) updateFields.email = body.email;
    if (body.password) updateFields.password = body.password;
    if (body.img) updateFields.img = body.img;
    if (body.status) updateFields.status = body.status;

    // stats ONLY if user sends stats
    if (body.stats) {
      updateFields.stats = {
        level: body.stats.level,
        matches: body.stats.matches,
        kdr: body.stats.kdr,
        badges: body.stats.badges,
      };
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      params.id,
      { $set: updateFields },
      { new: true }
    );

    return NextResponse.json(
      { success: true, message: "Account updated", account: updatedAccount },
      { status: 200 }
    );

  } catch (error) {
    console.error("PUT /api/accounts/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update account" },
      { status: 500 }
    );
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
