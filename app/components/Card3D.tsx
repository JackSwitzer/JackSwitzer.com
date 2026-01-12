'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import HTMLFlipBook to avoid SSR issues
const HTMLFlipBook = dynamic(() => import('react-pageflip').then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div className="w-[300px] h-[400px] bg-neutral-100 dark:bg-neutral-800 rounded-lg animate-pulse flex items-center justify-center">
      <span className="text-neutral-400">Loading...</span>
    </div>
  ),
});

// Hard cover page (front/back)
const CoverPage = React.forwardRef<HTMLDivElement, { src: string; alt: string }>(
  ({ src, alt }, ref) => (
    <div ref={ref} className="overflow-hidden" data-density="hard">
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
);
CoverPage.displayName = 'CoverPage';

// Soft inside page
const InsidePage = React.forwardRef<HTMLDivElement, { src: string; alt: string }>(
  ({ src, alt }, ref) => (
    <div ref={ref} className="bg-neutral-50 overflow-hidden" data-density="soft">
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
);
InsidePage.displayName = 'InsidePage';

export function Card3D({ className = '' }: { className?: string }) {
  const bookRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const goNext = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  const goPrev = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  if (!isClient) {
    return (
      <div className="w-[300px] h-[400px] bg-neutral-100 dark:bg-neutral-800 rounded-lg animate-pulse flex items-center justify-center">
        <span className="text-neutral-400">Loading...</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      {/* Flipbook container */}
      <div className="rounded-lg overflow-hidden shadow-2xl">
        {/* @ts-ignore */}
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
          flippingTime={600}
          useMouseEvents={true}
          swipeDistance={30}
          clickEventForward={true}
          usePortrait={false}
          startZIndex={0}
          autoSize={false}
          maxShadowOpacity={0.4}
          drawShadow={true}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {/* Front Cover */}
          <CoverPage src="/card-images/card_cover.png" alt="Switzer Theorem - Front Cover" />

          {/* Inside Left */}
          <InsidePage src="/card-images/card_inside_left.png" alt="Student Messages - Left" />

          {/* Inside Right */}
          <InsidePage src="/card-images/card_inside_right.png" alt="Student Messages - Right" />

          {/* Back Cover */}
          <CoverPage src="/card-images/card_back.png" alt="More Messages - Back Cover" />
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
          aria-label="Previous page"
        >
          ← Prev
        </button>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          Click corners to flip
        </span>
        <button
          onClick={goNext}
          className="px-4 py-2 text-sm font-medium rounded-lg
                     bg-neutral-100 dark:bg-neutral-800
                     hover:bg-neutral-200 dark:hover:bg-neutral-700
                     transition-colors"
          aria-label="Next page"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Card3D;
