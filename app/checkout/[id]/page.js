"use client"
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";
import { myContext } from "@/app/context/context";
import { getAccountById, getUserById } from "@/lib/apiClient";
import { processPayment, createOrder } from "@/lib/payment";

export default function CheckoutPage() {
    const { user, isLoaded } = useContext(myContext)
    const params = useParams();
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true)
    const [account, setAccount] = useState({})
    const [seller, setSeller] = useState({
        name: "",
        email: "",
        phone: "",
    })
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        paymentMethod: "jazzcash"
    });

    useEffect(() => {
        async function loadData() {
            try {
                const acc = await getAccountById(params.id);
                setAccount(acc);
                const sel = await getUserById(acc.createdBy);
                if (sel) {
                    setSeller(prev => ({
                        ...prev,
                        name: sel.user.name,
                        email: sel.user.email || "",
                        phone: sel.user.phoneNumbers?.[0]?.phoneNumber || "11111111111"
                    }))
                }
                // Auto-fill user data if available
                if (user) {
                    setFormData(prev => ({
                        ...prev,
                        name: user.fullName || "",
                        email: user.emailAddresses?.[0]?.emailAddress || "",
                        phone: user.phoneNumbers?.[0]?.phoneNumber || "222222222222"
                    }));
                }
            } catch (error) {
                console.error("Error loading account:", error)
            } finally {
                setLoading(false)
            }
        }
        loadData();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
           
            const paymentResult = await processPayment({
                accountId: params.id,
                accountPrice: account.price,
                sellerPhone: seller.phone,
                ...formData
            });
         
            if (paymentResult.success) {
                
                const orderResult = await createOrder({
                    accountId: params.id,
                    accountDetails: account,
                    customerInfo: formData,
                    paymentInfo: paymentResult,
                    sellerInfo: seller,
                    buyerId: user.id
                });

                window.location.href = `/checkout/success?order=${orderResult.orderId}`;
            } else {
                alert("Payment failed: " + (paymentResult.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Payment failed. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    if (loading || !isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="xl" showText={true} text="Loading checkout..." />
            </div>
        );
    }

    if (!account) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">Account not found</h1>
                    <p className="text-gray-600 mt-2">The account you're trying to purchase doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Complete Your Purchase</h1>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="border rounded-lg p-3 w-full"
                                        required
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="border rounded-lg p-3 w-full"
                                        required
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="border rounded-lg p-3 w-full"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="jazzcash"
                                        checked={formData.paymentMethod === "jazzcash"}
                                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                        className="text-orange-500"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                                            J
                                        </div>
                                        <span className="font-semibold">JazzCash</span>
                                    </div>
                                </label>

                                <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="easypaisa"
                                        checked={formData.paymentMethod === "easypaisa"}
                                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                        className="text-green-500"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                                            E
                                        </div>
                                        <span className="font-semibold">EasyPaisa</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="border-t pt-6">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Account: {account.title}</span>
                                    <span>Rs. {account.price}</span>
                                </div>
                                {/* Service Fee removed from here */}
                                <div className="flex justify-between mt-4 pt-4 border-t">
                                    <span className="text-lg font-bold">Total Amount</span>
                                    <span className="text-lg font-bold">Rs. {account.price}</span>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing || !isLoaded}
                            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
                        >
                            {processing ? (
                                <>
                                    <LoadingSpinner size="sm" />
                                    <span className="ml-2">Processing Payment...</span>
                                </>
                            ) : (
                                `Pay Rs. ${account.price}` // ✅ Only account price
                            )}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}