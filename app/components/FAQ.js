"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I buy a Free Fire account?",
      answer:
        "Browse available accounts, click 'Buy Now', and complete the secure payment. You’ll receive Gmail login details instantly after verification.",
    },
    {
      question: "Can I sell my own account here?",
      answer:
        "Yes! Go to the 'Sell Account' page, fill in your details, and upload verification proof. Once approved, your account will be listed for buyers.",
    },
    {
      question: "Is it safe to trade accounts?",
      answer:
        "Absolutely. Every account is manually verified and transfers are protected by our secure system to prevent scams or fraud.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Most accounts are delivered instantly after payment confirmation. For manual transfers, it can take up to 1 hour.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Refunds are available only if the account credentials don’t match the listing or fail verification. Read our refund policy for full details.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[var(--color-bg)] text-[var(--color-text)] py-20 rounded-3xl mt-12 shadow-lg border border-[var(--color-border)] transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-[var(--color-brand-yellow)] text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl p-5 cursor-pointer transition-all hover:border-[var(--color-brand-gold)] hover:shadow-md"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-[var(--color-text)]">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`transition-transform text-[var(--color-brand-yellow)] ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </div>

              {openIndex === i && (
                <p className="mt-3 text-[var(--color-link)] text-sm leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
