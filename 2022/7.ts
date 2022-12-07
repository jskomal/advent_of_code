import fs from 'fs'

const fileData = fs.readFileSync('./2022/7.txt')
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
  isDir: boolean
  isDirInRoot: boolean
  dirSums: number[]

  constructor(path: string, fileSize = 0, parent: FileTreeNode | null) {
    this.path = path
    this.fileSize = fileSize
    this.parent = parent
    this.descendants = null
    this.isDir = this.fileSize === 0
    this.isDirInRoot = this.parent?.parent === null && this.isDir
    this.dirSums = []
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

  countDirsInRoot = () => {
    return this.descendants?.filter((node) => node.isDirInRoot).length
  }

  sumDir = (target: FileTreeNode) => {
    if (target.descendants) {
      return target.descendants.reduce((acc, node) => {
        let recursiveSum = 0
        if (node.isDir) recursiveSum = target.sumDir(node)
        return acc + node.fileSize + recursiveSum
      }, 0)
    } else {
      return 0
    }
  }

  populateDirSums = () => {
    if (this.descendants) {
      for (const node of this.descendants) {
        if (node.isDir) this.dirSums.push(this.sumDir(node))
      }
    }
  }

  sumDirsUnderTarget = (target: number) => {
    this.populateDirSums()
    return this.dirSums.reduce((acc, num) => {
      if (num <= target) {
        return acc + num
      } else return acc
    }, 0)
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

console.log(fileDir.sumDirsUnderTarget(100_000))
