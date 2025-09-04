addEventListener('message', ({data}) => {
  const response = calculateFibonacci(data)
  postMessage(response)
});

function calculateFibonacci(num: number): number {
  if (num <= 1) return num
  return calculateFibonacci(num - 1) + calculateFibonacci(num - 2)
}
