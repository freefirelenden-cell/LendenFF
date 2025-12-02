"use client";

import { createAccount } from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Form from "@/app/components/Form";
import { myContext } from "@/app/context/context";




export default function SellAccountPage() {

  const { user } = useContext(myContext)
  const router = useRouter()
  const [tempImages, setTempImages] = useState([]);
  const [submiting, setSubmiting] = useState(false)
  const [progress, setProgress] = useState(0)


  const [form, setForm] = useState({
    title: "Level 75 • 15 Elite Passes • 300+ Skins",
    rank: "Heroic",
    price: "2999",
    img: [],
    description:
      "This Heroic-level Free Fire account comes with 300+ skins, 15 elite passes, and exclusive legendary bundles. Gmail verified and ready for instant transfer.",
    stats: { level: 23, matches: 21, kdr: 45, badges: 10 },
    uid: "1234567890",
    email: "seller@gmail.com",
    password: "test@123",
    isFeatured: false,
    userId: user?.id
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    try {
      if (!user?.id) {
        alert("Please wait for user to load or sign in first.");
        return;
      }

      const imagesToUpload = tempImages.filter(img => img.isTemp);
      const existingImages = tempImages.filter(img => !img.isTemp).map(img => ({ url: img.url, fileId: img.fileId }));

      const cleanedImages = [...existingImages];
      const total = imagesToUpload.length;

      for (let i = 0; i < total; i++) {
        const img = imagesToUpload[i];
        // update progress — base + per-image share
        setProgress(Math.round((i / total) * 80));  // example: 0–80 range
        const formData = new FormData();
        formData.append("file", img.file);
        formData.append("fileName", img.fileName);

        const res = await fetch("/api/image", {
          method: "POST",
          body: formData
        });
        if (!res.ok) throw new Error(`Upload failed for ${img.fileName}`);

        const result = await res.json();
        cleanedImages.push({ url: result.url, fileId: result.fileId });

        // optional: revoke object URL if using blob
        if (img.url.startsWith("blob:")) {
          URL.revokeObjectURL(img.url);
        }
      }

      setProgress(80);

      const finalForm = { ...form, userId: user.id, img: cleanedImages };
      setProgress(90);

      const uploadFormRes = await createAccount(finalForm);
      setProgress(100);

      alert("✅ Account created successfully!");
      router.push("/dashboard/accounts");

    } catch (error) {
      console.error("Submit error:", error);
      alert("Upload failed: " + error.message);
    } finally {
      setSubmiting(false);
    }
  };


  return (
    <Form
      handleSubmit={handleSubmit} form={form} setForm={setForm}
      tempImages={tempImages} submiting={submiting}
      setTempImages={setTempImages}
      progress={progress}
      name={"Sell Your Free Fire Account"} />
  );
}

