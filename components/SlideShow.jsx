"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { imageData } from "@data";
import ImageLoader from "./ImageLoader";

export default function SlideShow() {
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImageShow, setNextImageShow] = useState(1);
  const [prevImage, setPrevImage] = useState(imageData.length - 1);
  const imageContainerRef = useRef(null);
  const [revealTrigger, setRevealTrigger] = useState(0);

  const revealImage = useCallback((index) => {
    const numImages = imageData.length;

    if (index >= numImages) {
      setCurrentImage(0);
      setNextImageShow(1);
      setPrevImage(numImages - 1);
    } else if (index < 0) {
      setCurrentImage(numImages - 1);
      setPrevImage(numImages - 2);
      setNextImageShow(0);
    } else {
      setCurrentImage(index);
      setPrevImage(index - 1);
      setNextImageShow((index + 1) % numImages);
    }
    setRevealTrigger((prev) => prev + 1);
  }, []);

  const nextImage = useCallback(() => {
    revealImage(currentImage + 1);
  }, [currentImage, revealImage]);

  useEffect(() => {
    const slideInterval = setInterval(nextImage, 4000);
    return () => {
      clearInterval(slideInterval);
    };
  }, [nextImage]);

  return (
    <main
      className="slideshow flex justify-center items-center  h-screen w-screen relative "
      ref={imageContainerRef}
    >
      {imageData.map((img, index) => (
        <Image
          key={img.id}
          src={img.url}
          alt={img.name}
          height={1000}
          width={1000}
          className={`absolute h-0 w-screen object-cover origin-center z-30 transition-opacity duration-1000 ${
            index === currentImage ? "active" : ""
          }  ${index === prevImage ? "active" : ""}`}
        />
      ))}
      <ImageLoader
        currentImage={currentImage}
        nextImageShow={nextImageShow}
        imageData={imageData}
        revealTrigger={revealTrigger}
        nextImage={nextImage}
      />
    </main>
  );
}
