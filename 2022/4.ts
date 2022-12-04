import fs from 'fs'

const fileData = await fs.readFileSync('./2022/4.txt')
const lines: string[] = fileData.toString().split('\n')

let totalOverlapCount = 0
let anyOverlapCount = 0

for (const line of lines) {
  const firstInstruct = line.split(',')[0].split('-')
  const secondInstruct = line.split(',')[1].split('-')
  if (
    (parseInt(firstInstruct[0]) >= parseInt(secondInstruct[0]) &&
      parseInt(firstInstruct[1]) <= parseInt(secondInstruct[1])) ||
    (parseInt(firstInstruct[0]) <= parseInt(secondInstruct[0]) &&
      parseInt(firstInstruct[1]) >= parseInt(secondInstruct[1]))
  ) {
    totalOverlapCount++
  }
}

for (const line of lines) {
  const firstInstruct = line
    .split(',')[0]
    .split('-')
    .map((num) => parseInt(num, 10))
  const secondInstruct = line
    .split(',')[1]
    .split('-')
    .map((num) => parseInt(num, 10))
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
