// Note: this will be bundled into `dist/cli/`
// together with dependencies
import SimpleStorage from './SimpleStorage.js'

// Note: using 'require' instead of 'import' takes this out of rollup's responsibility
const { express } = require('./lib/vendor.js')
const path = require('path')
const fs = require('fs')

export default function serve(config) {
  const port = config.port || 7777
  const archiveDir = config.archiveDir
  if (!archiveDir) throw new Error("'archiveDir' is required")
  const apiUrl = '/api'
  let storage = new SimpleStorage({
    archiveDir,
    apiUrl,
    path, fs
  })
  return new Promise((resolve) => {
    let app = express()
    // GET list
    app.get(apiUrl+'/list', (req, res) => {
      storage.list()
        .then((list) => {
          res.json(list)
        })
        .catch((err) => {
          console.error(err)
          res.status(500)
        })
    })
    // GET content
    app.use(apiUrl+'/content/:resourceId', (req, res) => {
      // TODO: while serving files this way is convenient
      // it is not ideal that we take responsibility of the storage impl here
      let resourceId = req.params.resourceId
      res.sendFile(path.join(archiveDir, resourceId))
    })

    // serve app content statically
    app.use('/', express.static(__dirname))

    // start listening
    app.listen(port, () => {
      console.log(`Texture is running on http://localhost:${port}!`)
      resolve(app)
    })
  })
}
