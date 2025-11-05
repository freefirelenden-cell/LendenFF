import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { accountId, price, title } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "pkr",
            product_data: {
              name: title,
              description: `Free Fire Account - ${title}`,
            },
            unit_amount: price * 100, // Rs. to paisa
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/accounts/${accountId}`,
      metadata: {
        accountId: accountId,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}