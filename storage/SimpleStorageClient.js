import { sendRequest } from 'substance'

export default class SimpleStorageClient {

  constructor(config) {
    // ... config should contain everything necessary to access endpoints
    this.apiUrl = config.apiUrl
  }

  /*
    @returns the archive with raw data and asset URLs
      {
        manifest: '...' // xml string
        doc1: '' // xml string
        entities: '' // json string
        img1: '' // URL
        img2: '' // URL
      }
  */
  load() {
    let result = {}
    let list
    // retrieve a list of resources contained by the archive
    return sendRequest({
      url: this.apiUrl + '/list'
    })
    .then((res) => {
      list = JSON.parse(res)
    })
    .then(() => {
      let documents = []
      list.forEach((entry) => {
        if (entry.type === 'binary') {
          result[entry.id] = entry
        } else {
          documents.push(entry)
        }
      })
      // load all non-binary resources
      return Promise.all(documents.map((entry) => {
        return sendRequest({
          url: entry.url
        }).then((data) => {
          result[entry.id] = {
            type: entry.type,
            data: data
          }
        })
      })).then(() => {
        return result
      })
    })
  }

  /*
    @param archive a hash with updated resources as raw strings and blobs
      {
        manifest: '...' // xml string
        doc1: '' // xml string
        entities: '' // json string
        img1: ... // Blob
        img2: ... // URL
      }
  */
  // update(content) {

  // }
}