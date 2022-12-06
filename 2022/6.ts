import fs from 'fs'

const fileData = fs.readFileSync('./2022/6.txt')
const line: string = fileData.toString()

const findMarkerIndex = (strLength: number) => {
  let result = 0
  for (let i = 0; i < line.length; i++) {
    const stringsToCheck: string[] = []
    for (let j = 0; j < strLength; j++) {
      stringsToCheck.push(line[i + j])
    }
    const uniques = new Set(stringsToCheck)
    if (uniques.size === strLength) {
      result = i + strLength
      break
    }
  }
  return result
}

console.log(findMarkerIndex(4))
console.log(findMarkerIndex(14))
