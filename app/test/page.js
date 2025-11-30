"use client";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("");

  async function sendEmail(e) {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/send-mail", {
      method: "POST",
      body: JSON.stringify({
        to: "aqibdev24@gmail.com",
        type: "user",
        subject: "Test Email",
        message: "Yeh ek test email hai!",
      }),
    });

    const data = await res.json();
    setStatus(data.success ? "Sent!" : "Failed: " + data.error);
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Send Test Email</h2>
      <button onClick={sendEmail}>Send Test Mail</button>
      <p>{status}</p>
    </div>
  );
}
