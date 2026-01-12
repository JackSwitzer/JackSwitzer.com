import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content/projects');

export function getProjectContent(slug: string): string | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Split frontmatter from content
  const parts = fileContent.split('---');
  if (parts.length < 3) {
    return null;
  }

  // Content is everything after the second ---
  const content = parts.slice(2).join('---').trim();

  return content;
}

// Simple markdown to JSX elements conversion
export function parseMarkdownToElements(markdown: string): Array<{
  type: 'h1' | 'h2' | 'h3' | 'p' | 'img' | 'ul' | 'li' | 'table' | 'link' | 'strong' | 'blockquote';
  content?: string;
  src?: string;
  alt?: string;
  href?: string;
  items?: string[];
  rows?: string[][];
}> {
  const elements: Array<any> = [];
  const lines = markdown.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip the first h1 (title) since we already show it
    if (line.startsWith('# ') && elements.length === 0) {
      i++;
      continue;
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push({ type: 'h3', content: line.slice(4) });
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push({ type: 'h2', content: line.slice(3) });
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      elements.push({ type: 'h1', content: line.slice(2) });
      i++;
      continue;
    }

    // Images
    const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      elements.push({ type: 'img', alt: imgMatch[1], src: imgMatch[2] });
      i++;
      continue;
    }

    // Links on their own line
    const linkMatch = line.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      elements.push({ type: 'link', content: linkMatch[1], href: linkMatch[2] });
      i++;
      continue;
    }

    // Unordered list
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push({ type: 'ul', items });
      continue;
    }

    // Table
    if (line.startsWith('|') && line.includes('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        const row = lines[i];
        // Skip separator row
        if (row.includes('---')) {
          i++;
          continue;
        }
        const cells = row.split('|').slice(1, -1).map(c => c.trim());
        rows.push(cells);
        i++;
      }
      elements.push({ type: 'table', rows });
      continue;
    }

    // Regular paragraph
    if (line.trim()) {
      elements.push({ type: 'p', content: line });
    }

    i++;
  }

  return elements;
}
