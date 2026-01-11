"use client";

import { useState } from "react";
import Link from "next/link";

// Word list will be fetched once and cached
let wordListCache: Set<string> | null = null;

async function getWordList(): Promise<Set<string>> {
  if (wordListCache) return wordListCache;

  // Use a common English word list
  const response = await fetch(
    "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt"
  );
  const text = await response.text();
  wordListCache = new Set(
    text.split("\n").map((w) => w.trim().toLowerCase()).filter((w) => w.length >= 4)
  );
  return wordListCache;
}

// Spelling Bee Solver
function solveSpellingBee(
  centerLetter: string,
  outerLetters: string,
  wordList: Set<string>
): { words: string[]; pangrams: string[] } {
  const center = centerLetter.toLowerCase();
  const outer = outerLetters.toLowerCase().split("");
  const allLetters = new Set([center, ...outer]);

  const validWords: string[] = [];
  const pangrams: string[] = [];

  const wordArray = Array.from(wordList);
  for (let i = 0; i < wordArray.length; i++) {
    const word = wordArray[i];
    if (word.length < 4) continue;
    if (!word.includes(center)) continue;

    let valid = true;
    const usedLetters = new Set<string>();

    for (let j = 0; j < word.length; j++) {
      const char = word[j];
      if (!allLetters.has(char)) {
        valid = false;
        break;
      }
      usedLetters.add(char);
    }

    if (valid) {
      validWords.push(word);
      if (usedLetters.size === 7) {
        pangrams.push(word);
      }
    }
  }

  return {
    words: validWords.sort((a, b) => b.length - a.length || a.localeCompare(b)),
    pangrams: pangrams.sort((a, b) => a.localeCompare(b)),
  };
}

// Letter Boxed Solver
interface LetterBoxedSolution {
  path: string[];
  valid: boolean;
}

function solveLetterBoxed(
  sides: string[],
  wordList: Set<string>
): LetterBoxedSolution[] {
  // sides = ["abc", "def", "ghi", "jkl"] - 4 sides with 3 letters each
  const allLetters = new Set(sides.join("").toLowerCase().split(""));

  // Build a map of which side each letter is on
  const letterToSide: Map<string, number> = new Map();
  sides.forEach((side, idx) => {
    for (const letter of side.toLowerCase()) {
      letterToSide.set(letter, idx);
    }
  });

  // Check if a word is valid for Letter Boxed
  function isValidWord(word: string): boolean {
    if (word.length < 3) return false;

    for (const char of word) {
      if (!allLetters.has(char)) return false;
    }

    // Consecutive letters can't be from the same side
    for (let i = 0; i < word.length - 1; i++) {
      const side1 = letterToSide.get(word[i]);
      const side2 = letterToSide.get(word[i + 1]);
      if (side1 === side2) return false;
    }

    return true;
  }

  // Find valid words
  const validWords: string[] = [];
  const wordArray = Array.from(wordList);
  for (let i = 0; i < wordArray.length; i++) {
    const word = wordArray[i];
    if (isValidWord(word.toLowerCase())) {
      validWords.push(word.toLowerCase());
    }
  }

  // Sort by length and coverage
  validWords.sort((a, b) => {
    const coverageA = new Set(a.split("")).size;
    const coverageB = new Set(b.split("")).size;
    return coverageB - coverageA || b.length - a.length;
  });

  // Try to find 2-word solutions
  const solutions: LetterBoxedSolution[] = [];

  for (const word1 of validWords.slice(0, 100)) {
    const lastLetter = word1[word1.length - 1];
    const covered = new Set(word1.split(""));

    // Single word solution
    if (covered.size === allLetters.size) {
      solutions.push({ path: [word1], valid: true });
      continue;
    }

    for (const word2 of validWords) {
      if (word2[0] !== lastLetter) continue;

      const combined = new Set([...covered, ...word2.split("")]);
      if (combined.size === allLetters.size) {
        solutions.push({ path: [word1, word2], valid: true });
        if (solutions.length >= 10) break;
      }
    }
    if (solutions.length >= 10) break;
  }

  return solutions;
}

function SpellingBeeGame() {
  const [centerLetter, setCenterLetter] = useState("");
  const [outerLetters, setOuterLetters] = useState("");
  const [results, setResults] = useState<{ words: string[]; pangrams: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSolve = async () => {
    if (centerLetter.length !== 1) {
      setError("Center letter must be exactly 1 character");
      return;
    }
    if (outerLetters.length !== 6) {
      setError("Outer letters must be exactly 6 characters");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const wordList = await getWordList();
      const solution = solveSpellingBee(centerLetter, outerLetters, wordList);
      setResults(solution);
    } catch (e) {
      setError("Failed to load word list");
    }

    setLoading(false);
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Spelling Bee Solver</h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
        Enter the center letter and the 6 outer letters to find all valid words.
      </p>

      <div className="flex flex-col gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Center Letter</label>
          <input
            type="text"
            maxLength={1}
            value={centerLetter}
            onChange={(e) => setCenterLetter(e.target.value.toLowerCase())}
            className="w-20 px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-center text-xl font-bold uppercase"
            placeholder="A"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Outer Letters (6)</label>
          <input
            type="text"
            maxLength={6}
            value={outerLetters}
            onChange={(e) => setOuterLetters(e.target.value.toLowerCase())}
            className="w-40 px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-center text-xl font-bold uppercase tracking-widest"
            placeholder="BCDEFG"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleSolve}
          disabled={loading}
          className="w-fit px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 disabled:opacity-50 transition-colors"
        >
          {loading ? "Loading..." : "Find Words"}
        </button>
      </div>

      {results && (
        <div className="mt-6">
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">
              Pangrams ({results.pangrams.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {results.pangrams.map((word) => (
                <span
                  key={word}
                  className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded font-medium"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">
              All Words ({results.words.length})
            </h3>
            <div className="max-h-64 overflow-y-auto border border-neutral-200 dark:border-neutral-800 rounded-lg p-3">
              <div className="flex flex-wrap gap-2">
                {results.words.map((word) => (
                  <span
                    key={word}
                    className={`px-2 py-0.5 rounded text-sm ${
                      results.pangrams.includes(word)
                        ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 font-medium"
                        : "bg-neutral-100 dark:bg-neutral-800"
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LetterBoxedGame() {
  const [sides, setSides] = useState(["", "", "", ""]);
  const [results, setResults] = useState<LetterBoxedSolution[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSolve = async () => {
    if (sides.some((s) => s.length !== 3)) {
      setError("Each side must have exactly 3 letters");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const wordList = await getWordList();
      const solutions = solveLetterBoxed(sides, wordList);
      setResults(solutions);
    } catch (e) {
      setError("Failed to load word list");
    }

    setLoading(false);
  };

  const sideLabels = ["Top", "Right", "Bottom", "Left"];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Letter Boxed Solver</h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
        Enter the 3 letters on each side of the box. Words must alternate between sides.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4 max-w-xs">
        {sides.map((side, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium mb-1">{sideLabels[idx]}</label>
            <input
              type="text"
              maxLength={3}
              value={side}
              onChange={(e) => {
                const newSides = [...sides];
                newSides[idx] = e.target.value.toLowerCase();
                setSides(newSides);
              }}
              className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-center text-lg font-bold uppercase tracking-widest"
              placeholder="ABC"
            />
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleSolve}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 disabled:opacity-50 transition-colors"
      >
        {loading ? "Solving..." : "Find Solutions"}
      </button>

      {results && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-3">
            Solutions Found: {results.length}
          </h3>
          <div className="space-y-2">
            {results.map((solution, idx) => (
              <div
                key={idx}
                className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg"
              >
                <span className="text-sm text-neutral-500 mr-2">
                  {solution.path.length} word{solution.path.length > 1 ? "s" : ""}:
                </span>
                {solution.path.map((word, i) => (
                  <span key={i}>
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {word}
                    </span>
                    {i < solution.path.length - 1 && (
                      <span className="mx-1 text-neutral-400">→</span>
                    )}
                  </span>
                ))}
              </div>
            ))}
            {results.length === 0 && (
              <p className="text-neutral-500">No solutions found. Check your letters.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function NYTGamesPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold tracking-tight mb-2">NYT Games Solver</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-2">
        Interactive solvers for New York Times word puzzles.
      </p>
      <Link
        href="https://github.com/jackswitzer/NYT-Games"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block"
      >
        View on GitHub →
      </Link>

      <div className="mt-8 space-y-12">
        <SpellingBeeGame />
        <hr className="border-neutral-200 dark:border-neutral-800" />
        <LetterBoxedGame />
      </div>
    </section>
  );
}
