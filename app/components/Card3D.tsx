'use client';

import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';

// Page component with forwardRef for react-pageflip
const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = '' }, ref) => (
    <div ref={ref} className={`bg-white ${className}`}>
      {children}
    </div>
  )
);
Page.displayName = 'Page';

export function Card3D({ className = '' }: { className?: string }) {
  const bookRef = useRef<any>(null);

  const goNext = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  const goPrev = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      {/* Flipbook */}
      <div className="shadow-2xl">
        {/* @ts-ignore - react-pageflip types are incomplete */}
        <HTMLFlipBook
          ref={bookRef}
          width={300}
          height={400}
          size="fixed"
          minWidth={280}
          maxWidth={400}
          minHeight={350}
          maxHeight={500}
          showCover={true}
          mobileScrollSupport={false}
          className="shadow-xl"
          flippingTime={800}
          useMouseEvents={true}
          swipeDistance={30}
          clickEventForward={true}
          usePortrait={false}
          startZIndex={0}
          autoSize={false}
          maxShadowOpacity={0.5}
          drawShadow={true}
          style={{}}
        >
          {/* Page 1: Front Cover */}
          <Page className="rounded-r-lg overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src="/card-images/card_cover.png"
                alt="Switzer Theorem - Front Cover"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Page>

          {/* Page 2: Inside Left */}
          <Page className="overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src="/card-images/card_inside_left.png"
                alt="Student Messages - Inside Left"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Page>

          {/* Page 3: Inside Right */}
          <Page className="overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src="/card-images/card_inside_right.png"
                alt="Student Messages - Inside Right"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Page>

          {/* Page 4: Back Cover */}
          <Page className="rounded-l-lg overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src="/card-images/card_back.png"
                alt="More Messages - Back Cover"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Page>
        </HTMLFlipBook>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={goPrev}
          className="px-4 py-2 text-sm font-medium rounded-lg
                     bg-neutral-100 dark:bg-neutral-800
                     hover:bg-neutral-200 dark:hover:bg-neutral-700
                     transition-colors"
        >
          ← Previous
        </button>
        <span className="text-xs text-neutral-500">Click or drag to flip</span>
        <button
          onClick={goNext}
          className="px-4 py-2 text-sm font-medium rounded-lg
                     bg-neutral-100 dark:bg-neutral-800
                     hover:bg-neutral-200 dark:hover:bg-neutral-700
                     transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Card3D;
