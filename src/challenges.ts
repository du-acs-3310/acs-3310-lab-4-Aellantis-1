// Lab 4 — Date Utilities

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function parseDate(dateString: string): Date | null {
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? null : d;
}

// 1. formatShortDate
export function formatShortDate(dateString: string): string | null {
  const d = parseDate(dateString);
  if (!d) return null;

  return d.toISOString().slice(0, 10);
}

// 2. isBefore
export function isBefore(a: string, b: string): boolean {
  const da = parseDate(a);
  const db = parseDate(b);

  if (!da || !db) return false;

  return da.getTime() < db.getTime();
}

// 3. daysBetween
export function daysBetween(a: string, b: string): number | null {
  const da = parseDate(a);
  const db = parseDate(b);

  if (!da || !db) return null;

  const diff = Math.abs(db.getTime() - da.getTime());
  return Math.floor(diff / MS_PER_DAY);
}

// 4. sortPostsByCreatedAt
type Post = {
  createdAt: string;
};

export function sortPostsByCreatedAt(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );
}

// 5. relativeDayLabel
export function relativeDayLabel(
  target: string,
  today: string
): string | null {
  const t = parseDate(target);
  const d = parseDate(today);

  if (!t || !d) return null;

  const tUTC = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  const dUTC = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());

  const diffDays = Math.floor((dUTC - tUTC) / MS_PER_DAY);

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  return `${diffDays} days ago`;
}

// 6. isValidDateString
export function isValidDateString(dateString: string): boolean {
  return parseDate(dateString) !== null;
}