"use client";
import Image from "next/image";
import { useRef, memo, useEffect } from "react";

function ImageLoader({
  currentImage,
  nextImageShow,
  imageData,
  revealTrigger,
  nextImage,
}) {
  const lineContainerRef = useRef(null);
  useEffect(() => {
    if (lineContainerRef.current) {
      const lines = Array.from(lineContainerRef.current.children);
      lines.forEach((item) => {
        item.classList.remove("animate");
      });

      lineContainerRef.current.offsetHeight;

      lines.forEach((item) => {
        item.classList.add("animate");
      });
    }
  }, [revealTrigger]);

  return (
    <div className="absolute z-50 bottom-4 left-0 md:left-32 flex justify-center items-center gap-4 scale-75 md:scale-100">
      <div
        onClick={nextImage}
        ref={lineContainerRef}
        className="loader relative h-36 w-36 flex justify-center items-center cursor-pointer after:content-[''] after:size-36 after:absolute after:border-border-color after:border"
      >
        <div className="grow-line-1 absolute bg-primary-color h-[5px]"></div>
        <div className="grow-line-2 absolute bg-primary-color w-[5px]"></div>
        <div className="grow-line-3 absolute bg-primary-color h-[5px]"></div>
        <div className="grow-line-4 absolute bg-primary-color w-[5px]"></div>
        <div className="next-img-box">
          {imageData.map(
            (item, index) =>
              index === nextImageShow && (
                <Image
                  key={item.name}
                  className="next-img size-28 object-cover"
                  src={item.url}
                  width={500}
                  height={500}
                  alt="loader"
                />
              )
          )}
        </div>

        <div className="h-full w-full bg-black/10 absolute "></div>
        <span className="text-base text-primary-color absolute">Next</span>
      </div>

      <div className="counter text-primary-color flex justify-center items-center gap-2">
        <div className="count">
          {(currentImage + 1).toString().padStart(2, "0")}
        </div>
        <div className="w-24 border-b border-primary-color"></div>
        <div className="counter-const">
          {imageData.length.toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  return (
    prevProps.currentImage === nextProps.currentImage &&
    prevProps.nextImageShow === nextProps.nextImageShow &&
    prevProps.revealTrigger === nextProps.revealTrigger &&
    prevProps.nextImage === nextProps.nextImage
  );
}

export default memo(ImageLoader, areEqual);
