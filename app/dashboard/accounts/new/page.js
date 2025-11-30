"use client";

import { createAccount, uploadImages } from "@/lib/apiClient";
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
    userId: user?.id
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    setProgress(10);
    try {
      if (!user?.id) {
        alert("Please wait for user to load or sign in first.");
        return;
      }
      setProgress(25)
      const imagesRes = await uploadImages(tempImages);
      setProgress(50)
      const cleanedImages = imagesRes.map(({ url, fileId }) => ({ url, fileId }));
      setProgress(60)

      const finalForm = { ...form, userId: user.id, img: [...cleanedImages] }; // ✅ inject userId here
      setProgress(80)

      const uploadFormRes = await createAccount(finalForm);
      setProgress(100)
      alert("✅ Account created successfully!");
      router.push("/dashboard/accounts");

    } catch (error) {
      console.error(error);
    } finally {
      setSubmiting(false)
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

