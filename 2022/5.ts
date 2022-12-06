import fs from 'fs'

const fileData = fs.readFileSync('./2022/5.txt')
const lines: string[] = fileData.toString().split('\n')
const startingLocations = lines.slice(0, 8)
const moves = lines.slice(10, lines.length)
const input: { [key: string]: string[] } = {}

const parseInput = (instructions: string[], input: { [key: string]: string[] }) => {
  for (const line of instructions) {
    for (let i = 1, key = 1; i < line.length; i += 4) {
      if (key in input) {
        if (line[i] !== ' ') input[key].unshift(line[i])
      } else {
        input[key] = []
        if (line[i] !== ' ') input[key].unshift(line[i])
      }
      key++
    }
  }
}

parseInput(startingLocations, input)

const input2: { [key: string]: string[] } = JSON.parse(JSON.stringify(input))

// part 1
for (const instruction of moves) {
  const parsedInstruction = instruction
    .split(/move|from|to/)
    .filter((item) => item)
    .map((n) => parseInt(n, 10))

  for (let i = 0; i < parsedInstruction[0]; i++) {
    input[parsedInstruction[2]].push(input[parsedInstruction[1]].pop()!)
  }
}

//part 2

for (const instruction of moves) {
  const parsedInstruction = instruction
    .split(/move|from|to/)
    .filter((item) => item)
    .map((n) => parseInt(n, 10))
  const containerHolster: string[] = []
  for (let i = 0; i < parsedInstruction[0]; i++) {
    containerHolster.unshift(input2[parsedInstruction[1]].pop()!)
  }
  input2[parsedInstruction[2]].push(...containerHolster)
}

console.log(
  'part 1:',
  Object.values(input)
    .map((arr) => arr[arr.length - 1])
    .join(''),
  'part 2:',
  Object.values(input2)
    .map((arr) => arr[arr.length - 1])
    .join('')
)
