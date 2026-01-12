'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

type CardState = 'CLOSED_FRONT' | 'OPEN' | 'CLOSED_BACK';

interface Card3DProps {
  frontCover?: string;
  insideLeft?: string;
  insideRight?: string;
  backCover?: string;
  className?: string;
}

export function Card3D({
  frontCover = '/card-images/card_cover.png',
  insideLeft = '/card-images/card_inside_left.png',
  insideRight = '/card-images/card_inside_right.png',
  backCover = '/card-images/card_back.png',
  className = '',
}: Card3DProps) {
  const [cardState, setCardState] = useState<CardState>('CLOSED_FRONT');
  const [isAnimating, setIsAnimating] = useState(false);
  const [leftPanelZIndex, setLeftPanelZIndex] = useState(10);

  // Handle z-index swap at 50% of animation
  useEffect(() => {
    if (!isAnimating) return;

    const timer = setTimeout(() => {
      if (cardState === 'OPEN') {
        setLeftPanelZIndex(1);
      } else {
        setLeftPanelZIndex(10);
      }
    }, 400); // 50% of 0.8s animation

    return () => clearTimeout(timer);
  }, [cardState, isAnimating]);

  const handleCardClick = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (cardState === 'CLOSED_FRONT') {
      setCardState('OPEN');
    } else if (cardState === 'OPEN') {
      setCardState('CLOSED_FRONT');
    } else if (cardState === 'CLOSED_BACK') {
      // When viewing back, clicking opens it
      setCardState('CLOSED_FRONT');
    }

    setTimeout(() => setIsAnimating(false), 800);
  }, [cardState, isAnimating]);

  const handleFlipClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isAnimating) return;

      setIsAnimating(true);

      if (cardState === 'OPEN') {
        // Close first, then flip
        setCardState('CLOSED_FRONT');
        setTimeout(() => {
          setCardState('CLOSED_BACK');
        }, 800);
        setTimeout(() => setIsAnimating(false), 1600);
      } else if (cardState === 'CLOSED_FRONT') {
        setCardState('CLOSED_BACK');
        setTimeout(() => setIsAnimating(false), 800);
      } else {
        setCardState('CLOSED_FRONT');
        setTimeout(() => setIsAnimating(false), 800);
      }
    },
    [cardState, isAnimating]
  );

  // Calculate transforms based on state
  const getCardTransform = () => {
    switch (cardState) {
      case 'CLOSED_FRONT':
        return 'translateX(-25%) rotateY(0deg)';
      case 'OPEN':
        return 'translateX(0%) rotateY(0deg)';
      case 'CLOSED_BACK':
        return 'translateX(25%) rotateY(180deg)';
      default:
        return 'translateX(-25%) rotateY(0deg)';
    }
  };

  const getLeftPanelTransform = () => {
    switch (cardState) {
      case 'CLOSED_FRONT':
        return 'rotateY(0deg)';
      case 'OPEN':
        return 'rotateY(-180deg)';
      case 'CLOSED_BACK':
        return 'rotateY(0deg)';
      default:
        return 'rotateY(0deg)';
    }
  };

  const isOpen = cardState === 'OPEN';

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      {/* Card Scene - provides perspective */}
      <div
        className="card-scene relative w-full max-w-3xl"
        style={{
          perspective: '2000px',
          perspectiveOrigin: 'center center',
        }}
      >
        {/* Card Container - handles full card flip for CLOSED_BACK */}
        <div
          className="card relative cursor-pointer"
          style={{
            transformStyle: 'preserve-3d',
            transform: getCardTransform(),
            transition: 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
            width: '100%',
            aspectRatio: '2 / 1.4',
          }}
          onClick={handleCardClick}
        >
          {/* Right Panel (stationary - inside-right and back cover) */}
          <div
            className="panel-right absolute right-0 top-0 h-full"
            style={{
              width: '50%',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Inside Right Face (visible when open) */}
            <div
              className="panel-face absolute inset-0 rounded-r-lg overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                boxShadow: isOpen
                  ? 'inset 8px 0 24px -12px rgba(0,0,0,0.3)'
                  : 'none',
                transition: 'box-shadow 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
              }}
            >
              <Image
                src={insideRight}
                alt="Inside right of card"
                fill
                className="object-cover"
                priority
              />
              {/* Spine shadow overlay */}
              <div
                className="absolute inset-y-0 left-0 w-8 pointer-events-none"
                style={{
                  background: isOpen
                    ? 'linear-gradient(to right, rgba(0,0,0,0.15), transparent)'
                    : 'transparent',
                  transition: 'background 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
                }}
              />
            </div>

            {/* Back Cover Face (visible when card is flipped) */}
            <div
              className="panel-face absolute inset-0 rounded-r-lg overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <Image
                src={backCover}
                alt="Back of card"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Left Panel (rotates around spine) */}
          <div
            className="panel-left absolute left-0 top-0 h-full"
            style={{
              width: '50%',
              transformStyle: 'preserve-3d',
              transformOrigin: 'right center',
              transform: getLeftPanelTransform(),
              transition: 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
              zIndex: leftPanelZIndex,
            }}
          >
            {/* Front Cover Face (visible when closed from front) */}
            <div
              className="panel-face absolute inset-0 rounded-l-lg overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <Image
                src={frontCover}
                alt="Front cover of card"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Inside Left Face (visible when opened, needs 180deg rotation) */}
            <div
              className="panel-face absolute inset-0 rounded-l-lg overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                boxShadow: isOpen
                  ? '-4px 4px 20px rgba(0,0,0,0.2)'
                  : '0 4px 20px rgba(0,0,0,0.15)',
                transition: 'box-shadow 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
              }}
            >
              <Image
                src={insideLeft}
                alt="Inside left of card"
                fill
                className="object-cover"
                priority
              />
              {/* Spine shadow on inside left */}
              <div
                className="absolute inset-y-0 right-0 w-8 pointer-events-none"
                style={{
                  background: isOpen
                    ? 'linear-gradient(to left, rgba(0,0,0,0.12), transparent)'
                    : 'transparent',
                  transition: 'background 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Flip Button */}
      <button
        onClick={handleFlipClick}
        disabled={isAnimating}
        className="px-5 py-2.5 text-sm font-medium rounded-full
                   bg-neutral-900 dark:bg-neutral-100
                   text-neutral-100 dark:text-neutral-900
                   hover:bg-neutral-700 dark:hover:bg-neutral-300
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200
                   shadow-md hover:shadow-lg
                   active:scale-95"
      >
        {cardState === 'CLOSED_BACK' ? 'View Front' : 'View Back'}
      </button>

      {/* State indicator for debugging - can be removed in production */}
      <p className="text-xs text-neutral-400 dark:text-neutral-600">
        {cardState === 'CLOSED_FRONT' && 'Click to open'}
        {cardState === 'OPEN' && 'Click to close'}
        {cardState === 'CLOSED_BACK' && 'Click to flip to front'}
      </p>
    </div>
  );
}

export default Card3D;
