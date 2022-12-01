const fs = require('fs')

const day3A = async () => {
  const fileData = await fs.readFileSync('./2015/3.txt')
  const orders = fileData.toString().split('')
  const currentLocation = [0, 0]
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

  for (let i = 0; i < orders.length; i++) {
    switch (orders[i]) {
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
  console.log(visitedHousesCount)
}
day3A()
