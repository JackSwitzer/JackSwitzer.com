'use client';

import Image from 'next/image';
import Link from 'next/link';

type Element = {
  type: 'h1' | 'h2' | 'h3' | 'p' | 'img' | 'ul' | 'li' | 'table' | 'link' | 'strong' | 'blockquote';
  content?: string;
  src?: string;
  alt?: string;
  href?: string;
  items?: string[];
  rows?: string[][];
};

function processInlineMarkdown(text: string): React.ReactNode {
  // Process bold text (**text**)
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      // Add text before bold
      if (boldMatch.index > 0) {
        parts.push(remaining.slice(0, boldMatch.index));
      }
      // Add bold text
      parts.push(<strong key={key++} className="font-semibold">{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
    } else {
      parts.push(remaining);
      break;
    }
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export function MarkdownContent({ elements }: { elements: Element[] }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {elements.map((el, i) => {
        switch (el.type) {
          case 'h1':
            return (
              <h1 key={i} className="text-2xl font-bold mt-8 mb-4">
                {el.content}
              </h1>
            );
          case 'h2':
            return (
              <h2 key={i} className="text-xl font-semibold mt-8 mb-3 text-neutral-800 dark:text-neutral-200">
                {el.content}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="text-lg font-medium mt-6 mb-2 text-neutral-700 dark:text-neutral-300">
                {el.content}
              </h3>
            );
          case 'p':
            return (
              <p key={i} className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                {processInlineMarkdown(el.content || '')}
              </p>
            );
          case 'img':
            return (
              <figure key={i} className="my-6">
                <img
                  src={el.src}
                  alt={el.alt || ''}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-800 w-full"
                />
                {el.alt && (
                  <figcaption className="text-sm text-neutral-500 mt-2 text-center">
                    {el.alt}
                  </figcaption>
                )}
              </figure>
            );
          case 'ul':
            return (
              <ul key={i} className="list-disc list-inside mb-4 space-y-1 text-neutral-600 dark:text-neutral-400">
                {el.items?.map((item, j) => (
                  <li key={j}>{processInlineMarkdown(item)}</li>
                ))}
              </ul>
            );
          case 'table':
            if (!el.rows || el.rows.length === 0) return null;
            const [header, ...body] = el.rows;
            return (
              <div key={i} className="overflow-x-auto my-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800">
                      {header.map((cell, j) => (
                        <th key={j} className="py-2 px-3 text-left font-semibold text-neutral-700 dark:text-neutral-300">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {body.map((row, j) => (
                      <tr key={j} className="border-b border-neutral-100 dark:border-neutral-800">
                        {row.map((cell, k) => (
                          <td key={k} className="py-2 px-3 text-neutral-600 dark:text-neutral-400">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'link':
            return (
              <p key={i} className="my-4">
                <Link
                  href={el.href || '#'}
                  className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  {el.content}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
