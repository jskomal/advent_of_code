const fs = require('fs')

const rockPaperScissors = async () => {
  const fileData = await fs.readFileSync('./2022/2.txt')
  const lines: string[] = fileData.toString().split('\n')

  const strategy: { [key: string]: string } = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
    X: 'rock',
    Y: 'paper',
    Z: 'scissors'
  }

  const choicePoints: { [key: string]: number } = {
    rock: 1,
    paper: 2,
    scissors: 3
  }

  const rpsScore = (opponent: string, player: string) => {
    if (opponent === player) return 3
    if (opponent === 'rock' && player === 'paper') return 6
    if (opponent === 'rock' && player === 'scissors') return 0
    if (opponent === 'paper' && player === 'scissors') return 6
    if (opponent === 'paper' && player === 'rock') return 0
    if (opponent === 'scissors' && player === 'rock') return 6
    if (opponent === 'scissors' && player === 'paper') return 0
    throw Error('unexpected match outcome')
  }

  const determineOutcome = (line: string) => {
    const opponent = strategy[line[0]]
    const player = strategy[line[2]]
    const matchScore = rpsScore(opponent, player)
    return matchScore + choicePoints[player]
  }

  const result = lines.reduce((acc, line) => acc + determineOutcome(line), 0)

  console.log(result)
}
rockPaperScissors()

const rockPaperScissors2 = async () => {
  const fileData = await fs.readFileSync('./2022/2.txt')
  const lines: string[] = fileData.toString().split('\n')

  const strategy: { [key: string]: string } = {
    A: 'rock',
    B: 'paper',
    C: 'scissors'
  }

  const choicePoints: { [key: string]: number } = {
    rock: 1,
    paper: 2,
    scissors: 3
  }

  const outcomes: { [key: string]: number } = {
    X: 0,
    Y: 3,
    Z: 6
  }

  const determinePlayerPoints = (opponent: string, outcome: string) => {
    switch (outcome) {
      case 'Y':
        return choicePoints[opponent]
      case 'Z':
        if (opponent === 'rock') {
          return choicePoints.paper
        } else if (opponent === 'paper') {
          return choicePoints.scissors
        } else {
          return choicePoints.rock
        }
      case 'X':
        if (opponent === 'rock') {
          return choicePoints.scissors
        } else if (opponent === 'paper') {
          return choicePoints.rock
        } else {
          return choicePoints.paper
        }
      default:
        throw Error('unexpected match outcome')
    }
  }

  const determineOutcome = (line: string) => {
    const opponent = strategy[line[0]]
    const outcome = line[2]
    const matchScore = determinePlayerPoints(opponent, outcome)
    return matchScore + outcomes[outcome]
  }

  const result = lines.reduce((acc, line) => acc + determineOutcome(line), 0)

  console.log(result)
}
rockPaperScissors2()
