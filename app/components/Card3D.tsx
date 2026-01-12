'use client';

import { useState } from 'react';
import Image from 'next/image';

export function Card3D({ className = '' }: { className?: string }) {
  const [view, setView] = useState<'front' | 'inside' | 'back'>('front');
  const [isFlipping, setIsFlipping] = useState(false);

  const flipTo = (next: 'front' | 'inside' | 'back') => {
    if (isFlipping || next === view) return;
    setIsFlipping(true);
    setTimeout(() => {
      setView(next);
      setTimeout(() => setIsFlipping(false), 300);
    }, 300);
  };

  const handleClick = () => {
    if (view === 'front') flipTo('inside');
    else if (view === 'inside') flipTo('back');
    else flipTo('front');
  };

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      {/* Card container with perspective */}
      <div
        style={{ perspective: '1000px' }}
        className="transition-all duration-500 ease-in-out"
      >
        {/* Card */}
        <div
          className="relative cursor-pointer transition-all duration-500 ease-in-out"
          style={{
            width: view === 'inside' ? '500px' : '260px',
            height: '360px',
            maxWidth: '90vw',
            transformStyle: 'preserve-3d',
            transform: isFlipping ? 'rotateY(90deg)' : 'rotateY(0deg)',
            transition: 'transform 0.3s ease-in-out, width 0.5s ease-in-out',
          }}
          onClick={handleClick}
        >
          {/* Front Cover */}
          {view === 'front' && (
            <div className="absolute inset-0 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/card-images/card_cover.png"
                alt="Switzer Theorem - Front Cover"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Inside Spread */}
          {view === 'inside' && (
            <div className="absolute inset-0 flex gap-0.5">
              <div className="relative flex-1 rounded-l-lg overflow-hidden shadow-lg">
                <Image
                  src="/card-images/card_inside_left.png"
                  alt="Student messages - left side"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative flex-1 rounded-r-lg overflow-hidden shadow-lg">
                <Image
                  src="/card-images/card_inside_right.png"
                  alt="Student messages - right side"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Back Cover */}
          {view === 'back' && (
            <div className="absolute inset-0 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/card-images/card_back.png"
                alt="More student messages - Back Cover"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Page indicator dots */}
      <div className="flex gap-2">
        {(['front', 'inside', 'back'] as const).map((v) => (
          <button
            key={v}
            onClick={() => flipTo(v)}
            disabled={isFlipping}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              view === v
                ? 'bg-neutral-800 dark:bg-neutral-200 scale-110'
                : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500'
            }`}
            aria-label={`View ${v}`}
          />
        ))}
      </div>

      {/* Label */}
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        {view === 'front' && 'Front Cover — Click to open'}
        {view === 'inside' && 'Inside — Click to flip'}
        {view === 'back' && 'Back Cover — Click to restart'}
      </p>
    </div>
  );
}

export default Card3D;
