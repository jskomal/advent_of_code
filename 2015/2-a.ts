const fs = require('fs')

const day2a = async () => {
  const fileData = await fs.readFileSync('./2015/2.txt')
  const lines = fileData.toString().split('\n')
  const dimensions = lines.map((line: string) => line.split('x'))
  const totalWrapping = dimensions.reduce((acc: number, order: string[]) => {
    const lw = parseInt(order[0]) * parseInt(order[1])
    const wh = parseInt(order[0]) * parseInt(order[2])
    const lh = parseInt(order[1]) * parseInt(order[2])
    const smallest = Math.min(...[lw, wh, lh])
    acc += 2 * lw + 2 * wh + 2 * lh + smallest
    return acc
  }, 0)

  console.log(totalWrapping)
}

day2a()
