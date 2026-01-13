// Book data for portfolio bookshelf

export type Book = {
  title: string;
  author: string;
  rating: 4 | 5;
};

export type CurrentRead = {
  title: string;
  author: string;
  progress: string;
  blurb: string;
};

export const currentlyReading: CurrentRead[] = [
  {
    title: "Anna Karenina",
    author: "Leo Tolstoy",
    progress: "Page 311 / 817",
    blurb: "\"The three greatest novels are Anna Karenina, Anna Karenina, and Anna Karenina.\" — Faulkner. Part of a recent interest in Tsarist Russia and the events leading to revolution and catastrophe.",
  },
  {
    title: "Stalin: Paradoxes of Power",
    author: "Stephen Kotkin",
    progress: "Page 2182 / 2721",
    blurb: "Understanding how the Soviet state emerged from the chaos of revolution and civil war. The odd success of the 'Bolshevik' minority.",
  },
  {
    title: "Foundations of Optimization",
    author: "Osman Guler",
    progress: "Chapter 2.1 / 14",
    blurb: "Recommended by a professor. Rigorous treatment of optimization theory at just the right level of mathematical sophistication.",
  },
];

export const favouriteBooks: Book[] = [
  { title: "Flowers for Algernon", author: "Daniel Keyes", rating: 5 },
  { title: "Guns, Germs, and Steel", author: "Jared Diamond", rating: 5 },
  { title: "The Myth of Sisyphus", author: "Albert Camus", rating: 5 },
  { title: "Atomic Habits", author: "James Clear", rating: 5 },
  { title: "Empire of Pain", author: "Patrick Radden Keefe", rating: 5 },
  { title: "There Is No Antimemetics Division", author: "qntm", rating: 5 },
  { title: "The Will of the Many", author: "James Islington", rating: 5 },
  { title: "Gideon the Ninth", author: "Tamsyn Muir", rating: 5 },
  { title: "The Anxious Generation", author: "Jonathan Haidt", rating: 5 },
  { title: "Children of Time", author: "Adrian Tchaikovsky", rating: 4 },
  { title: "The Tipping Point", author: "Malcolm Gladwell", rating: 5 },
  { title: "Outliers", author: "Malcolm Gladwell", rating: 5 },
  { title: "Where the Crawdads Sing", author: "Delia Owens", rating: 5 },
];
