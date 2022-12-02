const fs = require('fs')

const highestCalories = async () => {
  const fileData = await fs.readFileSync('./2022/1.txt')
  const lines: string[] = fileData.toString().split('\n\n')
  const calorieCounts: number[] = []

  for (const line of lines) {
    const caloriesPerPerson = line
      .split('\n')
      .map((cal) => parseInt(cal, 10))
      .reduce((acc: number, num: number) => acc + num, 0)
    calorieCounts.push(caloriesPerPerson)
  }

  const sortedCalories = calorieCounts.sort((a, b) => b - a)
  console.log(sortedCalories.slice(0, 3).reduce((acc, num) => acc + num, 0))
}
highestCalories()
