const fs = require('fs')

const day3B = async () => {
  const fileData = await fs.readFileSync('./2015/3.txt')
  const orders = fileData.toString().split('')
  const santaLocation = [0, 0]
  const roboSantaLocation = [0, 0]
  const visitedLocations: number[][] = [[0, 0]]
  let visitedHousesCount = 1

  const checkIsLocationVisted = (currentLocation: number[]) => {
    let isVisited = false
    for (let j = 0; j < visitedLocations.length; j++) {
      const [x, y] = visitedLocations[j]
      if (currentLocation[0] === x && currentLocation[1] === y) {
        isVisited = true
        break
      }
    }
    return isVisited
  }

  const executeOrder = (order: string, currentLocation: number[]) => {
    switch (order) {
      case '>':
        currentLocation[0]++
        if (!checkIsLocationVisted(currentLocation)) {
          visitedHousesCount++
          visitedLocations.push([...currentLocation])
        }
        break
      case '^':
        currentLocation[1]++
        if (!checkIsLocationVisted(currentLocation)) {
          visitedHousesCount++
          visitedLocations.push([...currentLocation])
        }
        break
      case '<':
        currentLocation[0]--
        if (!checkIsLocationVisted(currentLocation)) {
          visitedHousesCount++
          visitedLocations.push([...currentLocation])
        }
        break
      case 'v':
        currentLocation[1]--
        if (!checkIsLocationVisted(currentLocation)) {
          visitedHousesCount++
          visitedLocations.push([...currentLocation])
        }
        break
      default:
        throw Error('unknown direction')
    }
  }

  for (let i = 0; i < orders.length; i++) {
    if (i % 2 === 0) {
      executeOrder(orders[i], santaLocation)
    } else {
      executeOrder(orders[i], roboSantaLocation)
    }
  }

  console.log(visitedHousesCount)
}
day3B()
