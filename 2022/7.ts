import fs from 'fs'
const fileData = fs.readFileSync('./2022/7.txt')
const lines = fileData.toString().split('\n')

class File {
  path: string
  size: number

  constructor(path, size) {
    this.path = path
    this.size = size
  }
}
class Directory {
  path: string
  parent: Directory | null
  files: File[] | null
  subdirectories: Directory[] | null

  constructor(path: string, parent: Directory | null) {
    this.path = path
    this.parent = parent
    this.files = null
    this.subdirectories = null
  }

  addFile = (path: string, fileSize = 0) => {
    const fileToAdd = new File(path, fileSize)
    if (this.files) {
      this.files.push(fileToAdd)
    } else {
      this.files = [fileToAdd]
    }
    return fileToAdd
  }

  addDirectory = (path: string) => {
    const dirToAdd = new Directory(path, this)
    if (this.subdirectories) {
      this.subdirectories.push(dirToAdd)
    } else {
      this.subdirectories = [dirToAdd]
    }
    return dirToAdd
  }

  findSubdirectory = (path: string) => {
    if (!this.subdirectories) return null
    return this.subdirectories.find((node) => node.path === path)
  }

  getSize = (startingPoint: Directory) => {
    let size = 0
    if (startingPoint.subdirectories) {
      for (const subdir of startingPoint.subdirectories) {
        size += subdir.getSize(subdir)
      }
    }
    if (startingPoint.files) {
      for (const file of startingPoint.files) {
        size += file.size
      }
    }
    return size
  }
}
/* ---------------------------------------------- */
const fileDir = new Directory('/', null)
const directories: Directory[] = []

let workingDir = fileDir
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].split(' ')
  switch (line[0]) {
    case '$':
      if (line[1] === 'cd') {
        if (line[2] === '..' && workingDir.parent !== null) {
          workingDir = workingDir.parent
        } else {
          const foundDescendant = workingDir.findSubdirectory(line[2])
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
      if (workingDir.findSubdirectory(line[1])) continue
      const newDir = workingDir.addDirectory(line[1])
      directories.push(newDir)
      break
    default:
      if (typeof parseInt(line[0]) !== 'number') {
        throw Error(`invalid input of ${line[0]}`)
      } else {
        workingDir.addFile(line[1], parseInt(line[0]))
      }
  }
}

let sum = 0
for (const dir of directories) {
  let size = dir.getSize(dir)
  if (size <= 100_000) sum += size
}
console.log(sum)

// Part 2
const totalPossible = 70_000_000
const neededFreeSpace = 30_000_000
//find the smallest dir that would free up neededFreeSpace

const totalSizeUsed = fileDir.getSize(fileDir)
const spaceLeft = totalPossible - totalSizeUsed
const spaceRequired = neededFreeSpace - spaceLeft
const possibleDirSizesForDeletion: number[] = []
for (const dir of directories) {
  if (dir.getSize(dir) >= spaceRequired) {
    possibleDirSizesForDeletion.push(dir.getSize(dir))
  }
}
const sortedDirs = possibleDirSizesForDeletion.sort((a, b) => a - b)
console.log(sortedDirs[0])
