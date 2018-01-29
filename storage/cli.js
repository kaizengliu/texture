import serve from './serve'

const fs = require('fs')
const path = require('path')
const { yargs, openurl } = require('./lib/vendor.js')

const argv = yargs
  .command({
    command: 'open <archive>',
    desc: 'Open a document archive in the browser',
    handler: (argv) => {
      const archiveDir = path.join(process.cwd(),argv.archive)
      if (!fs.existsSync(archiveDir)) {
        console.error('Archive does not exist!')
        process.exit(-1)
      }
      console.info(`Open archive ${argv.archive}`)
      // TODO: get port from args
      let port = 7777
      serve({
        port,
        archiveDir
      }).then(() => {
        openurl.open('http://localhost:'+port)
      })
    }
  })
  .command({
    command: '* <archive>',
    desc: 'Serve a document archive',
    handler: (argv) => {
      const archiveDir = path.join(process.cwd(),argv.archive)
      if (!fs.existsSync(archiveDir)) {
        console.error('Archive does not exist!')
        process.exit(-1)
      }
      console.info(`Serve archive ${argv.archive}`)
      // TODO: get port from args
      let port = 7777
      serve({
        port,
        archiveDir
      })
    }
  })
  .demandCommand()
  .help()
  .wrap(72)
  .argv
