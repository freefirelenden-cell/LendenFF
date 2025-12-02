import { databaseConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const db = await databaseConnection();

        // ✅ STEP 2: Real accounts fetch karo
        const accounts = await db.collection('accounts').find(
            {},
            { _id: 1, updatedAt: 1 } // Sirf ID aur last update time lo
        ).toArray();

        return NextResponse.json({ accounts: accounts }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ msg: error.message }, { status: 500 })

    }
}