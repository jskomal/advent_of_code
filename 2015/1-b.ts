const fs = require('fs')

const day2A = async () => {
  const fileData = await fs.readFileSync('./1.txt')
  const orders = fileData.toString().split('')

  let floor = 0
  let i = 0
  for (i; i < orders.length; i++) {
    if (floor === -1) break
    orders[i] === '(' ? floor++ : floor--
  }
  console.log(i)
  return i
}
day2A()
