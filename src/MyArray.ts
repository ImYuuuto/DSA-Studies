class MyArray<T> {
  protected data: T[];
  protected size: number;
  protected capacity: number;

  constructor(capacity: number = 4, initialData: T[] = []) {
    this.capacity = Math.max(capacity, initialData.length);
    this.size = initialData.length;
    this.data = new Array<T>(this.capacity);
    for (let i = 0; i < this.size; i++) {
      this.data[i] = initialData[i];
    }
  }

  get(index: number): T {
    this.validIndex(index);
    return this.data[index];
  }
  set(index: number, value: T): void {
    this.validIndex(index);
    this.data[index] = value;
  }
  length(): number {
    return this.size;
  }
  isEmpty(): boolean {
    return this.size === 0;
  }
  push(value: T): void {
    if (this.size > this.capacity) {
      this.resize();
    }
    this.data[this.size] = value;
    this.size++;
  }
  pop(): T | undefined {
    if (this.isEmpty()) return undefined;
    const lastElement = this.data[this.size - 1];
    this.size--;
    return lastElement;
  }
  insert(index: number, value: T): void {
    if (this.size < index || index < 0) {
      throw new Error("The index is out of reach. ");
    }
    if (this.size >= this.capacity) {
      this.resize();
    }
    this.size++;

    for (let i = this.size; i >= index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = value;
  }
  delete(index: number): T | undefined {
    this.validIndex(index);
    const deletedElement: T = this.data[index];
    for (let i = index; i < this.size - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.pop();
    return deletedElement;
  }
  indexOf(value: T): number {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === value) {
        return i;
      }
    }
    return -1;
  }
  contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }
  reverse(start: number = 0, end: number = this.size - 1): void {
    while (start < end) {
      [this.data[start], this.data[end]] = [this.data[end], this.data[start]];
      start++;
      end--;
    }
  }
  removeDuplicates(): void {
    const newArray = new MyArray<T>();
    for (let i = 0; i < this.size; i++) {
      if (!newArray.contains(this.data[i])) {
        newArray.push(this.data[i]);
      }
    }
    this.data = newArray.data;
    this.size = newArray.length();
    this.capacity = newArray.capacity;
  }
  rotate(k: number): void {
    if (this.size === 0) return;
    k = k % this.size;
    this.reverse();
    this.reverse(0, k - 1);
    this.reverse(k, this.size - 1);
  }
  merge(other: MyArray<T>): MyArray<T> {
    const mergedArray = new MyArray<T>(this.capacity + other.capacity);
    for (let i = 0; i < this.size; i++) {
      mergedArray.push(this.data[i]);
    }
    for (let i = 0; i < other.size; i++) {
      mergedArray.push(other.data[i]);
    }
    return mergedArray;
  }
  resize(): void {
    this.capacity *= 2;
    const newData: T[] = new Array<T>(this.capacity);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
  }
  validIndex(index: number) {
    if (index < 0 || index >= this.size) {
      throw new Error("the index is out of range.");
    }
  }
  arrLog() {
    console.log(this.data);
  }
}
class NumberArray extends MyArray<number> {
  max(): number | undefined {
    if (this.size === 0) return undefined;

    let max = this.data[0];

    for (let i = 1; i < this.size; i++) {
      if (this.data[i] > max) {
        max = this.data[i];
      }
    }

    return max;
  }
  min(): number | undefined {
    if (this.size === 0) return undefined;

    let min = this.data[0];

    for (let i = 1; i < this.size; i++) {
      if (this.data[i] < min) {
        min = this.data[i];
      }
    }

    return min;
  }
}
