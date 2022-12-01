const fs = require('fs')

const day1A = async () => {
  const fileData = await fs.readFileSync('./1.txt')
  const orders = fileData.toString().split('')

  let count = 0
  for (let i = 0; i < orders.length; i++) {
    orders[i] === '(' ? count++ : count--
  }
  console.log(count)
  return count
}
day1A()
