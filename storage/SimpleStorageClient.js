import { sendRequest } from 'substance'

export default class SimpleStorageClient {

  constructor(config) {
    // ... config should contain everything necessary to access endpoints
    this.apiUrl = config.apiUrl
  }

  /*
    The HTTP endpoint returns a hash of file records each having
      - 'id': unique identifier
      - 'type': resource type
      - 'mime-type' (optional)
      - 'path': local path as in a file-system
      - 'url': to retrieve the raw data
      - 'data' (optional)

    Binary files are typically provided as data, but just via URL.

    @returns the (raw) archive as a hash
  */
  load() {
    let result = {}
    let list
    // retrieve a list of resources contained by the archive
    return sendRequest({
      url: this.apiUrl + '/load'
    })
    .then((res) => {
      // TODO: should we do some integrity checking here?
      // potentially, this could be the place to run automatic-ingestion
      return JSON.parse(res)
    })
  }

  save(rawArchive) {
    // TODO: should we transform the raw archive here?
    // retrieve a list of resources contained by the archive
    return sendRequest({
      url: this.apiUrl + '/save',
      data: rawArchive
    })
  }
}