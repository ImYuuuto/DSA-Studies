class MyString {
  private data: string;

  constructor(data: string) {
    this.data = data;
  }
  charAt(index: number): string {
    this.indexCheck(index);
    return this.data[index];
  }
  length(): number {
    return this.data.length;
  }
  removeCharacter(index: number): string {
    this.indexCheck(index);
    let newString = "";
    for (let i = 0; i < this.length(); i++) {
      if (i !== index) {
        newString += this.data[i];
      }
    }
    this.data = newString;
    return this.data;
  }
  characterFrequency(): Record<string, number> {
    const frequencyCounter: Record<string, number> = {};
    for (let i = 0; i < this.length(); i++) {
      frequencyCounter[this.data[i]] = frequencyCounter[this.data[i]] + 1 || 1;
    }
    return frequencyCounter;
  }
  isPalindrome(): boolean {
    if (this.length() <= 1) return true;
    let start = 0;
    let end = this.length() - 1;

    while (start < end) {
      if (this.data[start] !== this.data[end]) return false;
      start++;
      end--;
    }
    return true;
  }
  isAnagram(other: string): boolean {
    const frequencyCounter: Record<string, number> = {};
    const otherFrequencyCounter: Record<string, number> = {};

    if (this.length() !== other.length) return false;
    for (let i = 0; i < this.length(); i++) {
      frequencyCounter[this.data[i].toLowerCase()] =
        frequencyCounter[this.data[i].toLowerCase()] + 1 || 1;
      otherFrequencyCounter[other[i].toLowerCase()] =
        otherFrequencyCounter[other[i].toLowerCase()] + 1 || 1;
    }
    for (const char in frequencyCounter) {
      if (frequencyCounter[char] !== otherFrequencyCounter[char]) return false;
    }
    return true;
  }
  firstNonRepeating(): string | null {
    const frequencyCounter: Record<string, number> = {};
    for (let i = 0; i < this.length(); i++) {
      frequencyCounter[this.data[i]] = frequencyCounter[this.data[i]] + 1 || 1;
    }
    for (let i = 0; i < this.length(); i++) {
      if (frequencyCounter[this.data[i]] === 1) return this.data[i];
    }
    return null;
  }
  reverseWords(): string {
    const words = this.data.split(" ");
    let start = 0;
    let end = words.length - 1;
    while (start < end) {
      [words[start], words[end]] = [words[end], words[start]];
      start++;
      end--;
    }
    this.data = words.join(" ");
    return this.data;
  }
  indexCheck(index: number): void {
    if (index < 0 || index >= this.length()) {
      throw new Error("Index is out of reach.");
    }
  }
}
