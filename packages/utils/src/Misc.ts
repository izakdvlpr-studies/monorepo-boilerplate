export class Misc {
  static capitalizeFirstLetter(text: string, everyWord = false) {
    const capitalizeWord = (word: string) =>
      word.charAt(0).toUpperCase() + word.slice(1);

    if (everyWord) return text.split(' ').map(capitalizeWord).join(' ');

    return capitalizeWord(text);
  }
}
