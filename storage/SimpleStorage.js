import { DefaultDOMElement } from 'substance'

/*
  This is considered experimental until we know what we need.

  TODO: we should make sure that an archive is in a consistent state
  - validate manifest.xml
  - documents and assets can be resolved
    -> documents should be valid (~how could this be done?)
*/
export default class SimpleStorage {

  constructor({ archiveDir, apiUrl, fs, path }) {
    this.archiveDir = archiveDir
    this.apiUrl = apiUrl

    this._fs = fs
    this._path = path
  }

  // provide a record with URLs for every doc or asset in the
  list() {
    const root = this.apiUrl
    return this._getManifest()
      .then((manifest) => {
        let result = [{
          id: 'manifest',
          type: 'manifest',
          url: `${root}/content/manifest.xml`
        }]
        let docs = manifest.findAll('document')
        docs.forEach((el) => {
          let id = el.attr('id')
          let loc = el.attr('path')
          let type = el.attr('type')
          if (!id || !type || !loc) {
            throw new Error('Illegal manifest entry: ', el.serialize())
          }
          result.push({
            id,
            type,
            url: `${root}/content/${loc}`
          })
        })
        return result
      })
  }

  get(id) {
    // TODO: read the file and return together with mime-type
  }

  update(content) {
    // overwrite content
    // TODO we should make sure that the archive does not get corrupted by this change
  }

  _getManifest() {
    const fs = this._fs
    const path = this._path
    return new Promise((resolve, reject) => {
      // read the manifest
      fs.readFile(path.join(this.archiveDir, 'manifest.xml'), (err, manifestStr) => {
        if (err) return reject(err)
        let manifest = DefaultDOMElement.parseXML(manifestStr)
        resolve(manifest)
      })
    })
  }
}