import { processDirectPayment } from "@/lib/paymentHandler";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { accountId, accountPrice, paymentMethod, name, email, phone, sellerPhone } = await req.json();

        // Validate required fields
        if (!accountId || !accountPrice || !name || !email || !phone || !sellerPhone) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        } 

        const totalAmount = Number(accountPrice);

        // Direct Payment to Seller
        const paymentResult = await processDirectPayment({
            amount: totalAmount,
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
            sellerPhone: sellerPhone,
            accountId: accountId,
            paymentMethod: paymentMethod
        });


        if (paymentResult.success) {
        
            return NextResponse.json(paymentResult);
        } else {
            return NextResponse.json(
                { success: false, error: paymentResult.error },
                { status: 402 }
            );
        }

    } catch (error) {
        console.error("Payment processing error:", error);
        return NextResponse.json(
            { success: false, error: "Payment processing failed" },
            { status: 500 }
        );
    }
}





