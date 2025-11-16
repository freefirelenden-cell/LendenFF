"use client";

import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { deleteImage, getAccountById, updateAccount, uploadImages } from "@/lib/apiClient";
import Form from "@/app/components/Form";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";
import { myContext } from "@/app/context/context";


export default function EditAccountPage() {
  const { userData, isLoadedUserData } = useContext(myContext)
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tempImages, setTempImages] = useState([])
  const [toDeleteImages, setToDeleteImages] = useState([])
  const [submiting, setSubmiting] = useState(false)
  const [progress, setProgress] = useState(0)

  // 🔹 Fetch existing account
  useEffect(() => {
    if (!params?.id) return;
    getAccountById(params.id)
    .then((data) => {
        setForm(data);
        console.log(data)
        const images = data.img.map(imgData => ({ ...imgData, isTemp: false }))
        setTempImages([...images])
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params.id]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    let updateForm = { ...form };


    try {
      // 1. Pehle delete karo images
      if (toDeleteImages.length > 0) {
        setProgress(25);
        // await Promise.all(toDeleteImages.map(img => deleteImage(img)));

        const filteredImages = form.img.filter(img =>
          !toDeleteImages.some(delImg => delImg.url === img.url) 
        );
        updateForm = { ...form, img: filteredImages }
        setProgress(50)
      }
      
      let finalForm = { ...updateForm };
      setProgress(60)

      if (tempImages && tempImages.length > 0) {
        setProgress(70)
        // const imagesRes = await uploadImages(tempImages);
        // const cleanedImages = imagesRes.map(({ url, fileId }) => ({ url, fileId }));

        // const allImages = [...(updateForm.img || []), ...cleanedImages];
        // finalForm = { ...updateForm, img: allImages };
        setProgress(80)
      }

      setProgress(90)
      // console.log(finalForm)
      // const res = await updateAccount(params.id, finalForm);
      setProgress(100)

      if (true) {
        alert("✅ Account updated successfully!");
        // router.push(`/dashboard/accounts/`);
      } else {
        alert("❌ Failed to update account!");
      }

    } catch (error) {
      console.error("Submit error:", error);
      alert("❌ Something went wrong!");
    } finally {
      setSubmiting(false);
    }
  };

  const isOwner = userData?.id === form?.createdBy;
  const isSold = form?.status == "sold"


  const renderMessage = (message, extraClass = "") => (
    <div className={`min-h-screen flex items-center justify-center text-[var(--color-text-secondary)] bg-[var(--color-bg)] ${extraClass}`}>
      {message}
    </div>
  );

  if ((!isLoadedUserData && !userData?.id) || loading) return <LoadingSpinner size="xl" showText={true} />
  if (!form) return renderMessage("Account not found ❌", "text-[var(--color-text)]");
  if (!isOwner || isSold) return renderMessage("Sorry you can not change this");

  return (
    <Form
      handleSubmit={handleSubmit}
      form={form} setForm={setForm}
      tempImages={tempImages}
      setTempImages={setTempImages}
      setToDeleteImages={setToDeleteImages}
      submiting={submiting}
      progress={progress}
      name={"Edit Account"} />
  );
}



