import {
  getQueryStringParam, Component, DefaultDOMElement, parseKeyEvent
} from 'substance'
import {
  Texture, JATSImportDialog, TextureArchive, VfsClient, HttpStorageClient
} from 'substance-texture'

window.addEventListener('load', () => {
  MyTextureEditor.mount({}, window.document.body)
})

/* Sample integration of Texture */
class MyTextureEditor extends Component {

  didMount() {
    this._init()
    DefaultDOMElement.getBrowserWindow().on('keydown', this._keyDown, this)
  }

  dispose() {
    DefaultDOMElement.getBrowserWindow().off(this)
  }

  getInitialState() {
    return {
      archive: undefined,
      error: undefined
    }
  }

  render($$) {
    let el = $$('div').addClass('sc-app')
    let archive = this.state.archive
    let err = this.state.error

    if (archive) {
      el.append(
        $$(Texture, {archive})
      )
    } else if (err) {
      if (err.type === 'jats-import-error') {
        el.append(
          $$(JATSImportDialog, { errors: err.detail })
        )
      } else {
        el.append(
          'ERROR:',
          err.message
        )
      }
    } else {
      el.append('Loading...')
    }
    return el
  }

  _init() {
    let storageUrl = getQueryStringParam('storage')
    let archivePath = getQueryStringParam('archive')
    let storage
    if (storageUrl) {
      storage = new HttpStorageClient(storageUrl)
    } else {
      storage = new VfsClient(window.vfs)
    }
    TextureArchive.load(archivePath, storage).then(archive => {
      this.setState({archive})
    }).catch(error => {
      this.setState({error})
    })
  }

  /*
    We may want an explicit save button, that can be configured on app level,
    but passed down to editor toolbars.
  */
  _save() {
    this.state.archive.save().then(() => {
      console.info('successfully saved')
    }).catch(err => {
      console.error(err)
    })
  }

  _keyDown(e) {
    let key = parseKeyEvent(e)
    if (key === 'META+83') {
      this._save()
      e.preventDefault()
    }
  }
}
