"use client";

import { useState } from "react";
import Image from "next/image";

type CardState = "closed" | "opening" | "open" | "flipped";

export function Card3D() {
  const [state, setState] = useState<CardState>("closed");

  const handleClick = () => {
    if (state === "closed") {
      setState("opening");
      setTimeout(() => setState("open"), 600);
    } else if (state === "open") {
      setState("flipped");
    } else if (state === "flipped") {
      setState("open");
    }
  };

  const handleReset = () => {
    setState("closed");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Card container */}
      <div
        className="relative cursor-pointer"
        style={{
          perspective: "1500px",
          width: "340px",
          height: "440px",
        }}
        onClick={handleClick}
      >
        {/* Back cover (bottom layer, only visible when open) */}
        {(state === "open" || state === "flipped") && (
          <div
            className="absolute inset-0 rounded-lg shadow-lg overflow-hidden transition-transform duration-500"
            style={{
              transform: state === "flipped" ? "rotateY(180deg)" : "rotateY(0deg)",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <Image
              src="/card-images/card_back.png"
              alt="Card back"
              fill
              className="object-contain bg-white"
            />
          </div>
        )}

        {/* Inside right panel (visible when open, behind left panel) */}
        {(state === "open" || state === "flipped") && (
          <div
            className="absolute rounded-lg shadow-md overflow-hidden transition-transform duration-500"
            style={{
              width: "170px",
              height: "440px",
              right: 0,
              transform: state === "flipped" ? "rotateY(180deg)" : "rotateY(0deg)",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <Image
              src="/card-images/card_inside_right.png"
              alt="Inside right"
              fill
              className="object-contain bg-neutral-50"
            />
          </div>
        )}

        {/* Inside left panel (visible when open) */}
        {(state === "open" || state === "flipped") && (
          <div
            className="absolute rounded-lg shadow-md overflow-hidden transition-transform duration-500"
            style={{
              width: "170px",
              height: "440px",
              left: 0,
              transform: state === "flipped" ? "rotateY(180deg)" : "rotateY(0deg)",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <Image
              src="/card-images/card_inside_left.png"
              alt="Inside left"
              fill
              className="object-contain bg-neutral-50"
            />
          </div>
        )}

        {/* Front cover (top layer, flips open) */}
        <div
          className="absolute rounded-lg shadow-xl overflow-hidden transition-all duration-700 ease-out origin-left"
          style={{
            width: state === "closed" || state === "opening" ? "100%" : "170px",
            height: "440px",
            left: 0,
            transform:
              state === "closed"
                ? "rotateY(0deg)"
                : state === "opening"
                ? "rotateY(-120deg)"
                : "rotateY(-180deg)",
            transformStyle: "preserve-3d",
            zIndex: state === "closed" ? 10 : 5,
          }}
        >
          {/* Front of cover */}
          <div
            className="absolute inset-0"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image
              src="/card-images/card_cover.png"
              alt="Switzer Theorem"
              fill
              className="object-contain bg-white"
            />
          </div>
          {/* Back of cover (inside left when opened) */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <Image
              src="/card-images/card_inside_left.png"
              alt="Inside left"
              fill
              className="object-contain bg-neutral-50"
            />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
        {state === "closed" && "Click to open"}
        {(state === "opening" || state === "open") && "Click to flip"}
        {state === "flipped" && "Click to flip back"}
      </div>

      {/* Reset button */}
      {state !== "closed" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
          }}
          className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 underline"
        >
          Close card
        </button>
      )}

      {/* Caption */}
      <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center max-w-sm mt-2">
        A card from my Linear Algebra students - the &quot;Switzer Theorem&quot; states that
        our education and my teaching are linearly dependent.
      </p>
    </div>
  );
}
