export function quicksortJs(arr: number[], left: number, right: number): void {
  let i = left, j = right;
  const pivot = arr[Math.floor((left + right) / 2)];
  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (arr[j] > pivot) j--;
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++; j--;
    }
  }
  if (left < j) quicksortJs(arr, left, j);
  if (i < right) quicksortJs(arr, i, right);
}