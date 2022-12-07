import fs from 'fs'

const fileData = fs.readFileSync('./2022/7-test.txt')
const lines = fileData.toString().split('\n')

/* 
find the sum of all directory sizes under or eq to 100_000

commands :
$ cd {dir} - moves working directory (WD)
$ ls - lists files and dirs at WD
dir - a dir at WD
{number} {filename} - a file at WD
*/

class FileTreeNode {
  path: string
  fileSize: number
  parent: FileTreeNode | null
  descendants: FileTreeNode[] | null
  isFirstLevelDir: boolean

  constructor(path: string, fileSize = 0, parent: FileTreeNode | null) {
    this.path = path
    this.fileSize = fileSize
    this.parent = parent
    this.descendants = null
    this.isFirstLevelDir = this.parent?.parent === null ? true : false
  }

  addDescendant = (path: string, fileSize = 0) => {
    if (!this.descendants) {
      this.descendants = [new FileTreeNode(path, fileSize, this)]
    } else {
      this.descendants.push(new FileTreeNode(path, fileSize, this))
    }
  }

  findDescendant = (path: string) => {
    if (!this.descendants) return null
    return this.descendants.find((node) => node.path === path)
  }

  calculateSumUnderTarget = (target: number) => {
    const dirSums: number[] = []

    // create tempSum for directory
    // if fileSize === 0, go deeper

    // else, add filesize to tempSum,

    // filter the dirSums to <= target
    // return filtered sum
  }
}

const fileDir = new FileTreeNode('/', 0, null)

// populate fileDir
let workingDir = fileDir
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].split(' ')
  switch (line[0]) {
    case '$':
      if (line[1] === 'cd') {
        if (line[2] === '..' && workingDir.parent !== null) {
          workingDir = workingDir.parent
        } else {
          const foundDescendant = workingDir.findDescendant(line[2])
          if (foundDescendant) {
            workingDir = foundDescendant
          } else {
            throw Error(`no descendant called ${line[2]} found at ${workingDir.path}`)
          }
        }
      } else if (line[1] === 'ls') {
        continue
      } else {
        throw Error(`line[1] was not cd or ls: value of ${line[1]}`)
      }
      break
    case 'dir':
      if (workingDir.findDescendant(line[1])) continue
      workingDir.addDescendant(line[1])
      break
    default:
      if (typeof parseInt(line[0]) !== 'number') {
        throw Error(`invalid input of ${line[0]}`)
      } else {
        workingDir.addDescendant(line[1], parseInt(line[0]))
      }
  }
}

console.log(fileDir.descendants)
