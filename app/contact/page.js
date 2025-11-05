"use client";
import { Mail, Phone, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert("Thank you for contacting us! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-[var(--color-bg)] text-[var(--color-text)] py-20 rounded-3xl mt-16 shadow-xl border border-[var(--color-border)] transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-[var(--color-brand-yellow)] text-center mb-10">
          Contact Us
        </h1>
        <p className="text-center text-[var(--color-link)] max-w-2xl mx-auto mb-12">
          Have questions about buying or selling Free Fire accounts? Our support
          team is here 24/7 to help you.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl shadow-lg p-8 space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--color-text)]">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-[var(--color-border)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-brand-yellow)]"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--color-text)]">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-[var(--color-border)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-brand-yellow)]"
                placeholder="example@gmail.com"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--color-text)]">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-[var(--color-border)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-brand-yellow)] resize-none"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--color-brand-yellow)] text-black font-semibold py-3 rounded-xl hover:bg-[var(--color-brand-gold)] transition-transform hover:scale-105"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6 text-[var(--color-link)]">
            <div className="flex items-center gap-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl p-5 hover:border-[var(--color-brand-gold)] transition">
              <Mail className="text-[var(--color-brand-yellow)]" size={28} />
              <div>
                <h3 className="font-semibold text-[var(--color-text)]">Email</h3>
                <p>support@freefirestore.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl p-5 hover:border-[var(--color-brand-gold)] transition">
              <Phone className="text-[var(--color-brand-yellow)]" size={28} />
              <div>
                <h3 className="font-semibold text-[var(--color-text)]">Phone</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl p-5 hover:border-[var(--color-brand-gold)] transition">
              <Clock className="text-[var(--color-brand-yellow)]" size={28} />
              <div>
                <h3 className="font-semibold text-[var(--color-text)]">Support Hours</h3>
                <p>24/7 — Always online for gamers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
