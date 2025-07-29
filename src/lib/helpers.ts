import { CoverSize } from 'src/enums/business/IGDBEnums/gameEnums';

export function titleAdjustment(
  title: string,
  proportion: number = 1
): [fontSize: number, extraClases: string] {
  let extraClases = '';
  if (getLongestWord(title).length > 11) {
    extraClases += 'word-break-word';
  }

  const length = title.length;

  if (length < 10) {
    return [25 * proportion, extraClases];
  }

  if (length > 20) {
    return [15 * proportion, extraClases];
  }

  return [20 * proportion, extraClases];
}

export function getLongestWord(phrase: string): string {
  let longestWord = '';
  const words = phrase.split(' ').forEach(word => {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  });
  return longestWord;
}

export async function preloadImages(imageSrcs: string[]) {
  return Promise.all(
    imageSrcs.map((src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = err => reject(err);
      });
    })
  );
}

export function shapeIGDBCoverUrl(size: CoverSize, stringId?: string | null) {
  if (!stringId) {
    return '/images/waip.png';
  }
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${stringId}.webp`;
}

export function unslug(slug: string): string {
  return slug
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatUnix(unixDate: number): string {
  const date = new Date(unixDate * 1000);
  return toLocale(date);
}

export function toLocale(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function formatDate(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

export function toISO(date: Date | null | undefined): string | null {
  return date ? date.toISOString().substring(0, 10) : null;
}
