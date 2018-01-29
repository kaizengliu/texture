import { ManifestLoader, DocumentArchive } from 'substance'
import { ArticleLoader, PubMetaLoader, Texture } from 'substance-texture'
import SimpleStorageClient from './SimpleStorageClient'

// TODO: the backend base-url should be configurable
window.onload = () => {
  let client = new SimpleStorageClient({
    apiUrl: 'http://localhost:7777/api'
  })
  client.load()
  .then((rawArchive) => {
    let sessions = {
      'manifest': ManifestLoader.load(rawArchive.manifest.data),
      'manuscript': ArticleLoader.load(rawArchive.manuscript.data),
      'pub-meta': PubMetaLoader.load(rawArchive['pub-meta'].data)
    }
    let archive = new DocumentArchive(sessions)
    Texture.mount({ archive }, window.document.body)
  })
}