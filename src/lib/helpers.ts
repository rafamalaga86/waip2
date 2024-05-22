export function titleAdjustment(
  title: string,
  proportion: number = 1
): [fontSize: number, extraClases: string] {
  let extraClases = '';
  if (longestWord(title).length > 11) {
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

export function longestWord(phrase: string): string {
  let longestWord = '';
  const words = phrase.split(' ').forEach(word => {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  });
  return longestWord;
}

export function formatUnix(unixDate: number): string {
  const date = new Date(unixDate * 1000);
  return toLocale(date);
}

export function toLocale(date: Date): string {
  return date.toLocaleDateString(process.env.LOCALE_TIME_FORMAT, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
