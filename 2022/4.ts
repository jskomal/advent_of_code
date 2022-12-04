import fs from 'fs'

const fileData = fs.readFileSync('./2022/4.txt')
const lines: string[] = fileData.toString().split('\n')

let totalOverlapCount = 0
let anyOverlapCount = 0

for (const line of lines) {
  const firstInstruct = line
    .split(',')[0]
    .split('-')
    .map((num) => parseInt(num, 10))
  const secondInstruct = line
    .split(',')[1]
    .split('-')
    .map((num) => parseInt(num, 10))
  if (
    (firstInstruct[0] >= secondInstruct[0] && firstInstruct[1] <= secondInstruct[1]) ||
    (firstInstruct[0] <= secondInstruct[0] && firstInstruct[1] >= secondInstruct[1])
  ) {
    totalOverlapCount++
  }
  // part 2
  const seen: { [key: string]: boolean } = {}
  for (let i = 0; i <= firstInstruct[1] - firstInstruct[0]; i++) {
    seen[firstInstruct[0] + i] = true
  }
  let hasOverlap = false
  for (let i = 0; i <= secondInstruct[1] - secondInstruct[0]; i++) {
    if (seen[secondInstruct[0] + i]) {
      hasOverlap = true
      break
    }
  }
  if (hasOverlap) anyOverlapCount++
}

console.log(totalOverlapCount)
console.log(anyOverlapCount)
