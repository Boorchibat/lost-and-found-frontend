"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC, useState } from "react";

type CarouselModalProps = {
  images: { url: string; public_id?: string }[];
  isOpen: boolean;
  onClose: () => void;
};

export const CarouselModal: FC<CarouselModalProps> = ({ images, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose} 
    >
      <div
        className="relative w-full max-w-4xl h-[80vh] flex flex-col items-center justify-center"
        onClick={handleModalClick}
      >
        <div className="relative w-full h-full mt-[50px] rounded-lg overflow-hidden">
          <Image
            src={images[currentIndex]?.url || "/file.svg"}
            alt={`Image ${currentIndex + 1}`}
            fill
            className="object-contain"
          />
        </div>
\
        <Button
          onClick={onClose}
          className="absolute top-1 right-2 text-white text-3xl font-bold bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70"
        >
          ✕
        </Button>

        {images.length > 1 && (
          <>
            <Button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl bg-black/50 p-3 rounded-full hover:bg-black/70"
            >
              ‹
            </Button>
            <Button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl bg-black/50 p-3 rounded-full hover:bg-black/70"
            >
              ›
            </Button>
          </>
        )}
        {images.length > 1 && (
          <div className="absolute bottom-2 flex gap-2 overflow-x-auto w-full justify-center p-1  rounded-lg">
            {images.map((img, index) => (
              <div
                key={index}
                className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 ${
                  index === currentIndex ? "border-green-400" : "border-white"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <Image
                  src={img.url}
                  alt={`Thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
