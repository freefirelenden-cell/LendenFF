"use client";
import { useState } from "react";

export default function PaymentOptions({ account, onClose }) {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [processing, setProcessing] = useState(false);

  const paymentMethods = {
    jazzcash: {
      name: "JazzCash",
      number: "0300-1234567",
      name: "Your Business Name",
      instructions: "Send payment via JazzCash App or USSD code *786#"
    },
    easypaisa: {
      name: "EasyPaisa",
      number: "0311-1234567", 
      name: "Your Business Name",
      instructions: "Send payment via EasyPaisa App or USSD code *786#"
    }
  };

  const handlePayment = async (method) => {
    setProcessing(true);
    try {
      // Payment record create karo database mein
      const paymentData = {
        accountId: account._id,
        method: method,
        amount: account.price,
        status: 'pending'
      };

      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });

      if (response.ok) {
        // WhatsApp message with payment details
        const message = `I want to buy: ${account.title}%0A%0APayment Details:%0AMethod: ${paymentMethods[method].name}%0AAmount: Rs. ${account.price}%0AAccount No: ${paymentMethods[method].number}%0AName: ${paymentMethods[method].name}`;
        
        window.open(`https://wa.me/923001234567?text=${message}`, '_blank');
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initiation failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Complete Payment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* JazzCash Option */}
          <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="jazzcash"
                checked={selectedMethod === "jazzcash"}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="text-blue-600"
              />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <span className="font-semibold">JazzCash</span>
              </div>
            </label>
            
            {selectedMethod === "jazzcash" && (
              <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                <p className="text-sm font-semibold">Send Rs. {account.price} to:</p>
                <p className="text-lg font-bold">0300-1234567</p>
                <p className="text-sm text-gray-600">Name: Your Business Name</p>
                <p className="text-xs text-gray-500 mt-2">
                  {paymentMethods.jazzcash.instructions}
                </p>
                <button
                  onClick={() => handlePayment('jazzcash')}
                  disabled={processing}
                  className="w-full mt-3 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50"
                >
                  {processing ? "Processing..." : "Confirm Payment"}
                </button>
              </div>
            )}
          </div>

          {/* EasyPaisa Option */}
          <div className="border rounded-lg p-4 hover:border-green-500 cursor-pointer">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="easypaisa"
                checked={selectedMethod === "easypaisa"}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="text-green-600"
              />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  E
                </div>
                <span className="font-semibold">EasyPaisa</span>
              </div>
            </label>
            
            {selectedMethod === "easypaisa" && (
              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-semibold">Send Rs. {account.price} to:</p>
                <p className="text-lg font-bold">0311-1234567</p>
                <p className="text-sm text-gray-600">Name: Your Business Name</p>
                <p className="text-xs text-gray-500 mt-2">
                  {paymentMethods.easypaisa.instructions}
                </p>
                <button
                  onClick={() => handlePayment('easypaisa')}
                  disabled={processing}
                  className="w-full mt-3 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
                >
                  {processing ? "Processing..." : "Confirm Payment"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          After payment, you'll be redirected to WhatsApp for confirmation
        </div>
      </div>
    </div>
  );
}