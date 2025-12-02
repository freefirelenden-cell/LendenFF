"use client";


import { useEffect, useState } from "react";

export default function faildToCreateOrder() {
    const [paymentId, setPaymentId] = useState(null);

    useEffect(() => {
        const last_payment = localStorage.getItem("last_payment");

        if (last_payment) {
            try {
                const parsed = JSON.parse(last_payment);
                setPaymentId(parsed.paymentId);
            } catch (err) {
                console.error("Invalid JSON in localStorage:", err);
            }
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">

                <h1 className="text-1xl font-bold text-red-800 text-center mb-6">
                    Agar app ne payment kiya lekin phir bhi app ko aap ka order nahi mila to ham se contact kar aor ye id batayen
                </h1>

                <div className="mb-5">
                    <div className="bg-gray-100 p-3 rounded-lg border text-gray-800 font-semibold">
                        03091186958
                    </div>
                </div>

                <div className="mb-5">
                    <div className="bg-gray-100 p-3 rounded-lg border text-gray-800 font-semibold">
                        id: {paymentId ?? "Loading..."}
                    </div>
                </div>

            </div>
        </div>
    );
}
