export function getFontSize(title: string) {
  if (typeof title !== 'string') {
    return 20;
  }

  const length = title.length;

  if (length < 10) {
    return 25;
  }

  if (length > 20) {
    return 15;
  }

  // if (longestWord(title).length > 11) {
  //   return 18;
  // }

  return 20;
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
