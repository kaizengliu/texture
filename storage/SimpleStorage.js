import { DefaultDOMElement } from 'substance'

function _walk(dir, done, fs, path) {
  if (!fs) fs = require('fs')
  if (!path) path = require('path')
  let results = []
  fs.readdir(dir, (err, list) => {
    if (err) return done(err)
    let pending = list.length
    if (!pending) return done(null, results);
    list.forEach((file) => {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
          }, fs, path)
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      })
    })
  })
}

function walk(dir, fs, path) {
  return new Promise((resolve, reject) => {
    _walk(dir, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    }, fs, path)
  })
}

/*
  Provides implementations for HTTP endpoints to load and save a raw archive.
*/
export default class SimpleStorage {

  constructor({ archiveDir, apiUrl, fs, path }) {
    this.archiveDir = archiveDir
    this.apiUrl = apiUrl

    this._fs = fs
    this._path = path
  }

  // should provide all records, with non-binary data pre-loaded,
  // and binary data provided via URL
  load() {
    return walk(this.archiveDir, this._fs, this._path)
    .then((files) => {

    })


    const root = this.apiUrl
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(this.archiveDir, 'manifest.xml'), (err, manifestStr) => {
        if (err) return reject(err)
        let result = {
          'manifest': {
            id: 'manifest',
            type: 'manifest',
            'mime-type': 'application/xml',
            url: `${root}/content/manifest.xml`,
            data: manifestStr
          }
        }
        let manifest = DefaultDOMElement.parseXML(manifestStr)
        manifest.findAll('document')

      fs.readFile(path.join(this.archiveDir, 'manifest.xml'), (err, manifestStr) => {
        if (err) return reject(err)
        let manifest = DefaultDOMElement.parseXML(manifestStr)
        resolve(manifest)
      })




      })
    })


    return this._getManifest()
      .then((manifest) => {
        let result = {
          'manifest': {
            id: 'manifest',
            type: 'manifest',
            'mime-type': 'application/xml',
            url: `${root}/content/manifest.xml`,
            data:
          }
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