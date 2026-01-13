import { currentlyReading, favouriteBooks, type CurrentRead, type Book } from "@/lib/books";

export default function BooksPage() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="border-b border-[var(--border)] pb-6">
        <div className="eyebrow mb-2">Reading</div>
        <h1 className="text-3xl font-bold leading-tight mb-2">Bookshelf</h1>
        <p className="text-[var(--muted)] text-sm">
          Currently reading and favourites.
        </p>
      </header>

      {/* Currently Reading */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Currently Reading</h2>
        <div className="space-y-4">
          {currentlyReading.map((book) => (
            <CurrentReadCard key={book.title} book={book} />
          ))}
        </div>
      </div>

      {/* Favourites */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Favourites</h2>
        <div className="space-y-2">
          {favouriteBooks.map((book) => (
            <BookCard key={book.title} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CurrentReadCard({ book }: { book: CurrentRead }) {
  return (
    <div className="p-4 border border-[var(--border)]">
      <div className="flex justify-between items-start gap-4 mb-2">
        <div>
          <h3 className="font-medium">{book.title}</h3>
          <p className="text-sm text-[var(--muted)]">{book.author}</p>
        </div>
        <span className="text-xs font-mono text-[var(--accent)] shrink-0">
          {book.progress}
        </span>
      </div>
      <p className="text-sm text-[var(--muted)] leading-relaxed">
        {book.blurb}
      </p>
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <div className="p-4 border border-[var(--border)] card-hover">
      <div className="flex justify-between items-center gap-4">
        <div className="min-w-0">
          <span className="font-medium">{book.title}</span>
          <span className="text-[var(--muted)]"> by {book.author}</span>
        </div>
        <span
          className={`text-sm font-mono shrink-0 ${
            book.rating === 5 ? "text-[var(--accent)]" : "text-[var(--muted)]"
          }`}
        >
          {book.rating}/5
        </span>
      </div>
    </div>
  );
}
