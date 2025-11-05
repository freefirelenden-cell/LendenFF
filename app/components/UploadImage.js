"use client";
import React from "react";

export default function UploadImage({ tempImages, setTempImages, setToDeleteImages }) {




  const selectFile = (e) => {
    const files = Array.from(e.target.files);

    // Max 3 images check
    if (files.length > 3) {
      alert("Maximum 3 images allowed!");
      return;
    }


    try {
      for (const file of files) {
        // Create object URL for preview
        const objectUrl = URL.createObjectURL(file);

        // setTempImages use karke image add karo
        setTempImages(prev => [...prev, {
          url: objectUrl,
          file: file, // actual file object
          fileName: file.name,
          isTemp: true // Browser temporary
        }]);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error selecting images!");
    } finally {
      e.target.value = ""; // Reset input
    }
  }

  const handleDeleteImages = (img, index) => {
    // to delete images from selected and imagekit 
    try {
      if (img.isTemp) {
        // remove from your selected
        if (img.url.startsWith('blob:')) {
          URL.revokeObjectURL(img.url);
        }

      } else {
        setToDeleteImages(prev => [...prev, tempImages[index]])
      }

      // Remove from state after successful delete
      setTempImages((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete image!");
    } 
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Upload Input */}
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={selectFile}
          className="border p-2 rounded"
        />
      </div>

      {/* Image Previews */}
      <div className="flex flex-wrap gap-3 mt-2">
        {tempImages?.map((img, i) => (
          <div
            key={i}
            className={`relative w-20 h-20 rounded overflow-hidden border `}
          >
            <img
              src={img.url}
              alt="preview"
              className="w-full h-full object-cover cursor-pointer"
            />
            <button
              type="button"
              // onClick={() => deleteImage(img, i, setTempImages, setDeleting )}
              onClick={() => handleDeleteImages(img, i)}
              className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-bl"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
