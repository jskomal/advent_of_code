const fs = require('fs')

const ruckSackReorg = async () => {
  const fileData = await fs.readFileSync('./2022/3.txt')
  const lines: string[] = fileData.toString().split('\n')

  const sharedPriorities: number[] = []
  const convertCharToPriority = (char: string) =>
    char.charCodeAt(0) - 96 > 0 ? char.charCodeAt(0) - 96 : char.charCodeAt(0) - 38

  for (const sack of lines) {
    const firstHalf = sack.slice(0, sack.length / 2)
    const secondHalf = sack.slice(sack.length / 2, sack.length)
    for (let i = 0; i < firstHalf.length; i++) {
      if (secondHalf.includes(firstHalf[i])) {
        sharedPriorities.push(convertCharToPriority(firstHalf[i]))
        break
      }
    }
  }
  console.log(sharedPriorities.reduce((acc, num) => acc + num, 0))
}
ruckSackReorg()

const ruckSackReorg2 = async () => {
  const fileData = await fs.readFileSync('./2022/3.txt')
  const lines: string[] = fileData.toString().split('\n')

  const sharedPriorities: number[] = []
  const convertCharToPriority = (char: string) =>
    char.charCodeAt(0) - 96 > 0 ? char.charCodeAt(0) - 96 : char.charCodeAt(0) - 38

  for (let i = 0; i < lines.length; i += 3) {
    const sacks = [lines[i], lines[i + 1], lines[i + 2]]
    const longestFirst = sacks.sort((a, b) => b.length - a.length)
    for (let j = 0; j < longestFirst[0].length; j++) {
      if (
        longestFirst[1].includes(longestFirst[0][j]) &&
        longestFirst[2].includes(longestFirst[0][j])
      ) {
        sharedPriorities.push(convertCharToPriority(longestFirst[0][j]))
        break
      }
    }
  }
  console.log(sharedPriorities.reduce((acc, num) => acc + num, 0))
}
ruckSackReorg2()
