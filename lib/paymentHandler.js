export async function processDirectPayment(paymentData) {
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