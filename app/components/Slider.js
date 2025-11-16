"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageSlider({ images = [], alt = "Account image" }) {
  const [current, setCurrent] = useState(0);

  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  if (!images.length) return null;

  return (
    <div className="relative w-full h-72 sm:h-96 overflow-hidden rounded-xl bg-black">
      {/* Images container — slides left/right */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full w-full"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative w-full flex-shrink-0 h-full"
          >
            <Image
              src={img.url}
              alt={`${alt} ${idx + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevImage}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextImage}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${idx === current ? "bg-white scale-125" : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
}


