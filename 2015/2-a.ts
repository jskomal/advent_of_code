const fs = require('fs')

const day2a = async () => {
  const fileData = await fs.readFileSync('./2015/2.txt')
  const lines = fileData.toString().split('\n')
  const dimensions = lines.map((line: string) => line.split('x'))
  const totalWrapping = dimensions.reduce((acc: number, order: string[]) => {
    const lw = 2 * parseInt(order[0]) * parseInt(order[1])
    const wh = 2 * parseInt(order[0]) * parseInt(order[2])
    const lh = 2 * parseInt(order[1]) * parseInt(order[2])
    const smallest = Math.min(...[lw / 2, wh / 2, lh / 2])
    acc += lw + wh + lh + smallest
    return acc
  }, 0)

  console.log(totalWrapping)
}

day2a()
