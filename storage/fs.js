// taking the level-filesystem and adding a synchronous seed() function
const levelup = require('levelup')
const levelfs = require('level-filesystem')
const leveljs = require('level-js')

const SLASH = '/'.charCodeAt(0)

function _getDirs(files) {
  let dirs = new Set()
  for (let i = 0; i < files.length; i++) {
    let f = files[0]
    if (f.charCodeAt(0) === SLASH) {
      f = f.slice(1)
    }
    let parts = f.split('/')
    let dir = ''
    for (let j = 0; j < parts.length-1; j++) {
      dir += '/' + parts[j]
      dirs.add(dir)
    }
  }
  dirs = Array.from(dirs)
  dirs.sort()
  return dirs
}

// for development we bundle files from the file-system into a hash
// which then can be used to seed
function seed(fs, data) {
  let files = Object.keys(data)
  let dirs = _getDirs(files)
  Promise.all(dirs.map((dir) => {
    return new Promise((resolve, reject) => {
      fs.mkdir(dir, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  })).then(() => {
    return Promise.all(files.map((f) => {
      let content = data[f]
      if (f.charCodeAt(0) !== SLASH) f = '/' + f
      let buf
      if (content.startsWith('hex:')) {
        buf = Buffer.from(content.slice(4), 'hex')
      } else {
        buf = Buffer.from(content, 'utf8')
      }
      return new Promise((resolve, reject) => {
        fs.writeFile(f, buf, (err) => {
          if (err) reject(err)
          else resolve()
        })
      })
    }))
  })
}

function open(dbName) {
  return levelfs(levelup(dbName, {db: leveljs}))
}

module.exports = {
  levelup,
  levelfs,
  leveljs,
  open,
  seed
}
