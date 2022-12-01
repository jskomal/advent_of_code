const fs = require('fs')

const day2b = async () => {
  const fileData = await fs.readFileSync('./2015/2.txt')
  const lines = fileData.toString().split('\n')
  const dimensions = lines.map((line: string) => line.split('x'))
  const totalRibbon = dimensions.reduce((acc: number, order: string[]) => {
    const sortedOrder = order.sort((a, b) => parseInt(a) - parseInt(b))
    const smallestWidths = [parseInt(sortedOrder[0]), parseInt(sortedOrder[1])]
    const bowLength = sortedOrder.reduce((sum: number, num: string) => {
      return sum * parseInt(num)
    }, 1)
    acc += smallestWidths[0] * 2 + smallestWidths[1] * 2 + bowLength
    return acc
  }, 0)

  console.log(totalRibbon)
}

day2b()
