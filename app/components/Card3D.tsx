'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Card3DProps {
  className?: string;
}

export function Card3D({ className = '' }: Card3DProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Card container with perspective */}
      <div
        style={{ perspective: '1200px' }}
        className="w-[500px] max-w-full"
      >
        {/* Book container - holds both pages */}
        <div
          className="relative cursor-pointer"
          style={{ aspectRatio: '1.4 / 1' }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Right page (inside-right, always visible as base) */}
          <div className="absolute inset-0 rounded-r-lg overflow-hidden shadow-lg">
            <Image
              src="/card-images/card_inside_right.png"
              alt="Inside right"
              fill
              className="object-cover"
            />
            {/* Spine shadow */}
            <div
              className="absolute inset-y-0 left-0 w-6 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.2), transparent)',
              }}
            />
          </div>

          {/* Left page (front cover on outside, inside-left on inside) */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden shadow-xl"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'right center',
              transform: isOpen ? 'rotateY(-160deg)' : 'rotateY(0deg)',
              transition: 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
            }}
          >
            {/* Front cover (visible when closed) */}
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <Image
                src="/card-images/card_cover.png"
                alt="Switzer Theorem"
                fill
                className="object-cover"
              />
            </div>

            {/* Inside left (visible when open) */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <Image
                src="/card-images/card_inside_left.png"
                alt="Inside left"
                fill
                className="object-cover"
              />
              {/* Spine shadow on inside */}
              <div
                className="absolute inset-y-0 right-0 w-6 pointer-events-none"
                style={{
                  background: 'linear-gradient(to left, rgba(0,0,0,0.15), transparent)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        {isOpen ? 'Click to close' : 'Click to open'}
      </p>
    </div>
  );
}

export default Card3D;
