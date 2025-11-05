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
    console.log(paymentResult)

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

// Direct Payment to Seller's JazzCash/EasyPaisa
async function processDirectPayment(paymentData) {
  try {
    const { paymentMethod, sellerPhone, amount, customerName, customerPhone, accountId } = paymentData;

    // Generate payment instructions for customer
    let paymentInstructions;
    let paymentUrl;

    if (paymentMethod === "jazzcash") {
      paymentInstructions = `Send Rs. ${amount} to JazzCash:\n📱 ${sellerPhone}\n\nAfter payment, share screenshot for confirmation.`;
      paymentUrl = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(`I want to buy account ${accountId}. Please confirm your JazzCash details.`)}`;
    } else if (paymentMethod === "easypaisa") {
      paymentInstructions = `Send Rs. ${amount} to EasyPaisa:\n📱 ${sellerPhone}\n\nAfter payment, share screenshot for confirmation.`;
      paymentUrl = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(`I want to buy account ${accountId}. Please confirm your EasyPaisa details.`)}`;
    }

    return {
      success: true,
      paymentId: `DIRECT-${Date.now()}`,
      method: paymentMethod,
      amount: amount,
      sellerPhone: sellerPhone,
      paymentInstructions: paymentInstructions,
      paymentUrl: paymentUrl,
      status: 'pending' // ✅ Model ke enum value use karo
    };
    
  } catch (error) {
    return {
      success: false,
      error: 'Payment processing failed'
    };
  }
}