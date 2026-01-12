'use client';

import { useState } from 'react';
import Image from 'next/image';

// Message data extracted from the card
const insideLeftMessages = [
  {
    text: `Hey Jack!
Just wanted to say thank you for all your efforts as our TA this semester for linalg. I really appreciate all your concise recaps of how to deal with the application of certain concepts in a simple manner. The effort you put in to even making a website and topic reviews was also very much appreciated, especially around midterm times. I also was very grateful for you sharing such a simple structure for proofs, that really helped me wrap my head around how I should approach those questions. Thanks for all the exact clarifications and patience in answering a bunch of my & my classmates' many questions. Best of luck with your studies!!`,
    signature: "Elizabeth",
    style: "cursive" as const,
  },
  {
    text: `Hey Jack!,
Thank you for being here every tutorial to teach us and answer our questions. At the beginning of the semester, Linear Algebra felt abstract and I felt that I had no idea what was going on. Having your explanations made the concepts easier to understand. Also, thank you for the notes you posted on your website, I found them helpful.
Wishing you the best in your future endeavors.
Best,`,
    signature: "Visakhan M",
    style: "print" as const,
  },
  {
    text: `Thanks for being the most proactive and kind TA I've had yet. Your willingness to help me and talk has made me more confident to ask questions. Your guidance is very valuable. Good luck on QUIP next year.
Cheers,`,
    signature: "Alex Barkas",
    style: "cursive" as const,
  },
];

const insideRightMessages = [
  {
    text: `JackSwitzer.com!! The goat`,
    signature: "Alex Lemogne",
    style: "casual" as const,
  },
  {
    text: `haven't been to many of these tutorials but I really wish I found out about them sooner. you're an amazing teacher.`,
    signature: "Bree Olijnyk",
    style: "cursive" as const,
  },
  {
    text: `Hi Jack!
Thank you for being incredible help at the help desk and introducing me to your awesome website! Wish I found your tutorials earlier but glad I got to come to one (say hi to Zero for me)`,
    signature: "Zayner Cigun",
    style: "cursive" as const,
  },
  {
    text: `Jack!
TBH, I thought Linear Algebra was gonna suck... and it kinda did but these tutorials made it so much better and made me understand everything (except RREF?) but thats ok, I hate rref and Thanks for letting me eat in class literally every week and thanks for being a goated TA!`,
    signature: "Liz",
    style: "messy" as const,
  },
  {
    text: `Hey Jack!
Thank you so much for your efforts with us! You were a great great TA!! Your patience and energy were amazing!
Wishing you all the best :)`,
    signature: "Nourhan Jadallah",
    style: "print" as const,
  },
  {
    text: `Hi Jack! You've been such an engaging and informative TA. Your concise explanations and graphic visuals really helped me understand the concepts! Plus, no other TA would ever make a freaking website. Thank you!`,
    signature: "Evton",
    style: "cursive" as const,
  },
];

const backMessages = [
  {
    text: `Dear Jack,
Thank you for your dedication and hard work as our TA this semester. Your passion for math drives us all, and gives us perspective as to why what we are learning is so important! Thank you for making so many resources available to us, and all the time and patience you give to the job. I'm really looking forward to maybe having the chance to work with you on QSC next year (fingers crossed!).
Enjoy your well-deserved summer break!
All the best,`,
    signature: "Sabrina",
    style: "cursive" as const,
  },
  {
    text: `Dear Jack,
Thank you so much for this semester! You have made me love linear algebra! Your passion for this subject does not go unnoticed.
Enjoy your summer!
- Thanks!`,
    signature: "Kara",
    style: "print" as const,
  },
  {
    text: `Jack!
I really loved the lin alg tutorials so much this sem! I'd also be so confused in lecture and then finally understand in tutorial every week. Your famous quotes also keep me paying attention my favourites are "matrices are... a bunch of garbage honestly" and "never do matrix multiplication in front of other people"
Anyways thank you so much and I know I can pass 174 with the help of @jackswitzer.com.
Good luck with exams!`,
    signature: "Meredith",
    style: "print" as const,
  },
];

type MessageStyle = 'cursive' | 'print' | 'messy' | 'casual';

function MessageCard({
  text,
  signature,
  style,
  rotate = 0,
}: {
  text: string;
  signature: string;
  style: MessageStyle;
  rotate?: number;
}) {
  const fontClass = {
    cursive: 'font-serif italic',
    print: 'font-sans',
    messy: 'font-serif italic',
    casual: 'font-sans font-medium',
  }[style];

  return (
    <div
      className={`p-2 ${fontClass}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        fontSize: '0.55rem',
        lineHeight: '1.3',
      }}
    >
      <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-line mb-1">
        {text}
      </p>
      <p className="text-neutral-600 dark:text-neutral-400 font-medium">
        — {signature}
      </p>
    </div>
  );
}

export function Card3D({ className = '' }: { className?: string }) {
  const [currentPage, setCurrentPage] = useState(0); // 0=front, 1=inside, 2=back
  const [isAnimating, setIsAnimating] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const goToPage = (page: number) => {
    if (isAnimating || page === currentPage || page < 0 || page > 2) return;
    setIsAnimating(true);
    setCurrentPage(page);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  const pageLabels = ['Front Cover', 'Inside', 'Back Cover'];

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Book container */}
      <div
        className="relative"
        style={{ perspective: '2000px' }}
      >
        {/* Book wrapper */}
        <div
          className="relative cursor-pointer"
          style={{
            width: currentPage === 1 ? '580px' : '280px',
            height: '380px',
            maxWidth: '95vw',
            transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onClick={() => {
            if (currentPage < 2) nextPage();
            else goToPage(0);
          }}
        >
          {/* Front Cover */}
          <div
            className="absolute inset-0 rounded-lg shadow-xl overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s',
              transform: currentPage >= 1 ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              opacity: currentPage >= 1 ? 0 : 1,
              pointerEvents: currentPage >= 1 ? 'none' : 'auto',
              backfaceVisibility: 'hidden',
            }}
          >
            {showOriginal ? (
              <Image
                src="/card-images/card_cover.png"
                alt="Switzer Theorem - Front Cover"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <Image
                src="/card-images/card_cover_clean.png"
                alt="Switzer Theorem - Front Cover"
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* Inside Spread */}
          <div
            className="absolute inset-0 rounded-lg shadow-xl overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              transition: 'opacity 0.3s ease-in-out',
              opacity: currentPage === 1 ? 1 : 0,
              pointerEvents: currentPage === 1 ? 'auto' : 'none',
            }}
          >
            {showOriginal ? (
              <div className="absolute inset-0 flex">
                <div className="relative flex-1">
                  <Image
                    src="/card-images/card_inside_left.png"
                    alt="Student messages - left side"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative flex-1">
                  <Image
                    src="/card-images/card_inside_right.png"
                    alt="Student messages - right side"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40">
                {/* Left page */}
                <div className="flex-1 p-3 border-r border-amber-200/50 dark:border-amber-700/30 overflow-hidden">
                  <div className="h-full flex flex-col gap-1">
                    {insideLeftMessages.map((msg, i) => (
                      <MessageCard
                        key={i}
                        {...msg}
                        rotate={[-1, 0.5, -0.5][i]}
                      />
                    ))}
                  </div>
                </div>
                {/* Spine shadow */}
                <div className="w-1 bg-gradient-to-r from-amber-200/50 via-amber-300/30 to-amber-200/50 dark:from-amber-800/30 dark:via-amber-700/20 dark:to-amber-800/30" />
                {/* Right page */}
                <div className="flex-1 p-3 overflow-hidden">
                  <div className="h-full grid grid-cols-2 gap-1">
                    {insideRightMessages.map((msg, i) => (
                      <MessageCard
                        key={i}
                        {...msg}
                        rotate={[1, -1, 0.5, -0.5, 1, -1][i]}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Back Cover */}
          <div
            className="absolute inset-0 rounded-lg shadow-xl overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'right center',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s',
              transform: currentPage <= 1 ? 'rotateY(180deg)' : 'rotateY(0deg)',
              opacity: currentPage === 2 ? 1 : 0,
              pointerEvents: currentPage === 2 ? 'auto' : 'none',
              backfaceVisibility: 'hidden',
            }}
          >
            {showOriginal ? (
              <Image
                src="/card-images/card_back.png"
                alt="More student messages - Back Cover"
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 p-4">
                <div className="h-full flex flex-col gap-2">
                  {backMessages.map((msg, i) => (
                    <MessageCard
                      key={i}
                      {...msg}
                      rotate={[-0.5, 0.5, -1][i]}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex items-center gap-3">
        <button
          onClick={(e) => { e.stopPropagation(); prevPage(); }}
          disabled={isAnimating || currentPage === 0}
          className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {[0, 1, 2].map((page) => (
            <button
              key={page}
              onClick={(e) => { e.stopPropagation(); goToPage(page); }}
              disabled={isAnimating}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentPage === page
                  ? 'bg-neutral-800 dark:bg-neutral-200 scale-110'
                  : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500'
              }`}
              aria-label={`Go to ${pageLabels[page]}`}
            />
          ))}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); nextPage(); }}
          disabled={isAnimating || currentPage === 2}
          className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Page label */}
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        {pageLabels[currentPage]} — Click to {currentPage < 2 ? 'flip' : 'restart'}
      </p>

      {/* Toggle for original images */}
      <button
        onClick={(e) => { e.stopPropagation(); setShowOriginal(!showOriginal); }}
        className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors underline underline-offset-2"
      >
        {showOriginal ? 'Show styled version' : 'View original scanned card'}
      </button>
    </div>
  );
}

export default Card3D;
