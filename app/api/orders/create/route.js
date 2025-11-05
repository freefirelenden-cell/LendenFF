import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { databaseConnection } from "@/lib/db";

export async function POST(req) {
  try {
    await databaseConnection();

    const { 
      accountId, 
      accountDetails, 
      customerInfo, 
      paymentInfo, 
      sellerInfo,
      buyerId
    } = await req.json();


    // Validate required fields
    if (!accountId || !buyerId) {
      return NextResponse.json(
        { success: false, error: "Missing accountId or buyerId" },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`.toUpperCase();

    // Create order object with all required fields
    const orderData = {
      orderId,
      accountId,
      buyerId,
      sellerId: sellerInfo?.clerkId || accountDetails?.createdBy || "unknown_seller",
      accountDetails: {
        title: accountDetails?.title || "Unknown Account",
        rank: accountDetails?.rank || "Unknown",
        price: accountDetails?.price || 0,
        uid: accountDetails?.uid || "N/A",
        email: accountDetails?.email || "N/A",
        password: accountDetails?.password || "",
        images: accountDetails?.img || []
      },
      customerInfo: {
        name: customerInfo?.name || "Unknown Customer",
        email: customerInfo?.email || "unknown@email.com",
        phone: customerInfo?.phone || "N/A"
      },
      sellerInfo: {
        name: sellerInfo?.name || "Unknown Seller",
        phone: sellerInfo?.phoneNumber || "N/A",
        email: sellerInfo?.email || "unknown@email.com"
      },
      paymentInfo: {
        paymentId: paymentInfo?.paymentId || `PAY-${Date.now()}`,
        transactionId: paymentInfo?.transactionId || `TXN-${Date.now()}`,
        method: paymentInfo?.method || "jazzcash",
        amount: paymentInfo?.amount || accountDetails?.price || 0,
        status: paymentInfo?.status || 'pending'
      },
      orderStatus: 'pending_payment'
    };


    // Database mein save karo
    const newOrder = new Order(orderData);
    await newOrder.save();

    return NextResponse.json({ 
      success: true, 
      orderId: newOrder.orderId,
      message: "Order created successfully"
    });
    
  } catch (error) {
    console.error("Order creation error:", error);
    
    // Detailed error logging
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      console.log("Validation errors:", validationErrors);
      
      return NextResponse.json(
        { 
          success: false, 
          error: "Validation failed",
          details: validationErrors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Order creation failed",
        message: error.message 
      },
      { status: 500 }
    );
  }
}