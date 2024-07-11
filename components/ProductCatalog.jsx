"use client";
import { SliderImageData } from "@data";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function ProductCatalog() {
  const containerRef = useRef(null);
  const [pressed, setPressed] = useState(false);
  const [cursorGrabbed, setCursorGrabbed] = useState("grab");
  const [startX, setStartX] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const radius = 750; // Radius of the circle
    const container = containerRef.current;
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    const angleStep = (2 * Math.PI) / SliderImageData.length;

    SliderImageData.forEach((item, index) => {
      const angle = index * angleStep + rotationAngle;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const rotation = (angle * 180) / Math.PI + 90;
      const element = container.children[index];
      element.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    });
  }, [rotationAngle]);

  const handleMouseDown = (e) => {
    setPressed(true);
    setStartX(e.nativeEvent.offsetX);
    setCursorGrabbed("grabbing");
  };

  const handleMouseMove = (e) => {
    if (!pressed) return;
    e.preventDefault();
    const currentX = e.nativeEvent.offsetX;
    const diffX = currentX - startX;
    const sensitivity = 0.3;
    const rotationIncrement = diffX * sensitivity;
    setRotationAngle((prevAngle) => prevAngle + rotationIncrement);
    setStartX(currentX);
  };

  const handleMouseUp = () => {
    setPressed(false);
    setCursorGrabbed("grab");
  };

  const handleMouseLeave = () => {
    if (pressed) {
      setPressed(false);
      setCursorGrabbed("grab");
    }
  };

  return (
    <section className="flex flex-col items-center">
      <div className="mt-12 md:mt-60">
        <h2 className="text-[1.875rem] md:text-6xl font-normal text-center">
          Quality Products
        </h2>
        <p className="max-w-2xl text-2xl text-center mt-8 text-text-color">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      <div className="h-screen w-screen flex justify-center items-center overflow-hidden">
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          ref={containerRef}
          className={`circle-container relative flex justify-center items-center top-[95%] ${
            cursorGrabbed === "grabbing" ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ transition: "transform 0.5s ease" }} // Apply transition style inline
        >
          {SliderImageData.map((item) => (
            <div key={item.id} className="circle-item absolute">
              <Image
                src={item.url}
                alt={item.name}
                height={500} // Adjust height and width as needed
                width={500} // Adjust height and width as needed
                className="max-w-96 aspect-[9/13] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
