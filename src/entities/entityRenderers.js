import { DefaultDOMElement } from 'substance'

function journalArticleRenderer($$, entityId, entityDb) {
  let entity = entityDb.get(entityId)
  let fragments = []
  if (entity.authors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.authors, entityDb),
      '.'
    )
  }
  if (entity.editors.length > 0) {
    fragments = fragments.concat(
      ' ',
      _renderAuthors($$, entity.editors, entityDb),
      '.'
    )
  }
  // We render an annotated article title here:
  if (entity.articleTitle) {
    fragments.push(
      ' ',
      _renderHTML($$, entity.articleTitle)
    )
  }

  fragments.push('. ', entity.source)
  if (entity.volume) {
    fragments.push(
      ' ',
      $$('strong').append(
        entity.volume
      )
    )
  }

  if (entity.fpage && entity.lpage) {
    fragments.push(':', entity.fpage, '-', entity.lpage)
  }

  if (entity.doi) {
    fragments.push(
      ' ',
      _renderDOI($$, entity.doi)
    )
  }
  return fragments
}

function bookRenderer($$, entityId, entityDb) {
  let entity = entityDb.get(entityId)
  let fragments = []

  if (entity.chapterTitle) {
    fragments.push(
      _renderHTML($$, entity.chapterTitle),
      '. '
    )
  }

  if (entity.authors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.authors, entityDb),
      '.'
    )
  }
  if (entity.editors.length > 0) {
    fragments = fragments.concat(
      ' ',
      _renderAuthors($$, entity.editors, entityDb),
      '.'
    )
  }

  if (entity.year) {
    fragments.push(' ', entity.year, '.')
  }

  if (entity.source) {
    fragments.push(' ', entity.source)
    if (entity.edition) {
      fragments.push(' (', entity.edition, ')')
    }
    fragments.push('.')
  }

  if (entity.publisherLoc && entity.publisherName) {
    fragments.push(' ', entity.publisherLoc, ': ', entity.publisherName, '.')
  }

  if (entity.doi) {
    fragments.push(
      ' ',
      _renderDOI($$, entity.doi)
    )
  }

  if (entity.fpage && entity.lpage) {
    fragments.push(
      ' pp. ',
      entity.fpage,
      '-',
      entity.lpage,
      '.'
    )
  }
  return fragments
}

// ${article-title}. ${sponsors}  (sponsors) (${year}). ${doi}
function clinicalTrialRenderer($$, entityId, entityDb) {
  let entity = entityDb.get(entityId)
  let fragments = []

  if (entity.articleTitle) {
    fragments.push(
      _renderHTML($$, entity.articleTitle),
      '. '
    )
  }

  if (entity.sponsors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.sponsors, entityDb),
      ' (sponsors)'
    )
  }

  if (entity.year) {
    fragments.push(' (', entity.year, ').')
  }

  if (entity.doi) {
    fragments.push(
      ' ',
      _renderDOI($$, entity.doi)
    )
  }
  return fragments
}

function preprintRenderer($$, entityId, entityDb) {
  let entity = entityDb.get(entityId)
  let fragments = []

  if (entity.articleTitle) {
    fragments.push(
      _renderHTML($$, entity.articleTitle),
      '. '
    )
  }

  if (entity.authors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.authors, entityDb)
    )
  }

  if (entity.year) {
    fragments.push(' (', entity.year, ').')
  }

  if (entity.source) {
    fragments.push(' ', entity.source, '.')
  }

  if (entity.doi) {
    fragments.push(
      ' ',
      _renderDOI($$, entity.doi)
    )
  }
  return fragments
}


function patentRenderer($$, entityId, entityDb) {
  let entity = entityDb.get(entityId)
  let fragments = []
  if (entity.articleTitle) {
    fragments.push(
      _renderHTML($$, entity.articleTitle),
      '. '
    )
  }
  if (entity.inventors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.inventors, entityDb)
    )
  }
  if (entity.year) {
    fragments.push(' (', entity.year, ').')
  }
  if (entity.assignee) {
    fragments.push(' ', entity.assignee, ',')
  }
  if (entity.patentNumber) {
    fragments.push(' ', entity.patentNumber)
  }
  if (entity.patentCountry) {
    fragments.push(' (', entity.patentCountry, ').')
  }
  return fragments
}

function dataPublicationRenderer($$, entityId, entityDb) {
  let entity = entityDb.get(entityId)
  let fragments = []

  if (entity.dataTitle) {
    fragments.push(
      _renderHTML($$, entity.dataTitle),
      '. '
    )
  }
  if (entity.authors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.authors, entityDb)
    )
  }
  if (entity.year) {
    fragments.push(' (', entity.year, ').')
  }
  if (entity.source) {
    fragments.push(' ', entity.assignee, ',')
  }
  if (entity.doi) {
    fragments.push(
      ' ',
      _renderDOI($$, entity.doi)
    )
  }
  return fragments
}

function periodicalRenderer($$, entityId, entityDb) {
  let entity = entityDb.get(entityId)
  let fragments = []
  if (entity.articleTitle) {
    fragments.push(
      _renderHTML($$, entity.articleTitle),
      '. '
    )
  }
  if (entity.authors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.authors, entityDb)
    )
  }
  if (entity.year) {
    fragments.push(' (', entity.year, ').')
  }
  if (entity.source) {
    fragments.push(
      ' ',
      $$('em').append(entity.assignee),
      ','
    )
  }

  if (entity.fpage && entity.lpage) {
    fragments.push(
      ' p. ',
      entity.fpage,
      '-',
      entity.lpage,
      '.'
    )
  }

  return fragments
}


function reportRenderer($$, entityId, entityDb) {
  let entity = entityDb.get(entityId)
  let fragments = []
  if (entity.authors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.authors, entityDb)
    )
  }
  if (entity.year) {
    fragments.push(' (', entity.year, ').')
  }
  if (entity.source) {
    fragments.push(
      ' ',
      $$('em').append(
        entity.source
      ),
      '.'
    )
  }
  return fragments
}

function conferenceProceedingRenderer($$, entityId, entityDb) {
  let entity = entityDb.get(entityId)
  let fragments = []

  if (entity.articleTitle) {
    fragments.push(
      _renderHTML($$, entity.articleTitle),
      '. '
    )
  }

  if (entity.authors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.authors, entityDb)
    )
  }

  if (entity.year) {
    fragments.push(' (', entity.year, ').')
  }

  if (entity.confName) {
    fragments.push(' ', entity.confName, ',')
  }

  if (entity.source) {
    fragments.push(' ', entity.source, '.')
  }

  if (entity.fpage && entity.lpage) {
    fragments.push(
      ' pp. ',
      entity.fpage,
      '-',
      entity.lpage,
      '.'
    )
  }

  if (entity.doi) {
    fragments.push(
      ' ',
      _renderDOI($$, entity.doi)
    )
  }
  return fragments
}

function softwareRenderer($$, entityId, entityDb) {
  let entity = entityDb.get(entityId)
  let fragments = []

  if (entity.title) {
    fragments.push(
      _renderHTML($$, entity.title)
    )
    if (entity.version) {
      fragments.push(', ', entity.version)
    }
    fragments.push('.')
  }
  if (entity.authors.length > 0) {
    fragments = fragments.concat(
      ' ',
      _renderAuthors($$, entity.authors, entityDb)
    )
  }
  if (entity.publisherName) {
    fragments.push(' ', entity.publisherName)
  }
  if (entity.publisherLoc) {
    fragments.push(', ', entity.publisherLoc)
  }
  return fragments
}

function thesisRenderer($$, entityId, entityDb) {
  let entity = entityDb.get(entityId)
  let fragments = []

  if (entity.articleTitle) {
    fragments.push(
      _renderHTML($$, entity.articleTitle),
      '. '
    )
  }
  if (entity.authors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.authors, entityDb)
    )
  }
  if (entity.year) {
    fragments.push(' (', entity.year, ').')
  }
  if (entity.publisherName) {
    fragments.push(' ', entity.publisherName)
  }
  if (entity.publisherLoc) {
    fragments.push(', ', entity.publisherLoc)
  }
  return fragments
}

function webpageRenderer($$, entityId, entityDb) {
  let entity = entityDb.get(entityId)
  let fragments = []

  if (entity.title) {
    fragments.push(
      _renderHTML($$, entity.title),
      '. '
    )
  }
  if (entity.authors.length > 0) {
    fragments = fragments.concat(
      _renderAuthors($$, entity.authors, entityDb)
    )
  }
  if (entity.year && entity.month && entity.day) {
    fragments.push(' (', entity.year, '-', entity.month, '-', entity.day, ').')
  }

  if (entity.publisherLoc) {
    fragments.push(' ', entity.publisherLoc)
  }

  if (entity.uri) {
    fragments.push(' ', entity.uri)
  }
  return fragments
}


function personRenderer($$, entityId, entityDb, options = {}) {
  let { prefix, suffix, givenNames, surname } = entityDb.get(entityId)
  if (options.short) {
    givenNames = _getInitials(givenNames)
  }
  let result = []
  if (prefix) {
    result.push(prefix, ' ')
  }
  result.push(
    givenNames,
    ' ',
    surname
  )
  if (suffix) {
    result.push(' (', suffix, ')')
  }
  return result
}

function organisationRenderer($$, entityId, entityDb, options = {}) {
  let { name, country } = entityDb.get(entityId)
  let result = [ name ]
  if (!options.short) {
    if (country) {
      result.push(', ', country)
    }
  }
  return result
}

const INTERNAL_RENDERER_MAP = {
  'organisation': organisationRenderer,
  'person': personRenderer
}

/*
  Exports
*/
export default {
  'person': _delegate(personRenderer),
  'book': _delegate(bookRenderer),
  'journal-article': _delegate(journalArticleRenderer),
  'conference-proceeding': _delegate(conferenceProceedingRenderer),
  'clinical-trial': _delegate(clinicalTrialRenderer),
  'preprint': _delegate(preprintRenderer),
  'report': _delegate(reportRenderer),
  'organisation': _delegate(organisationRenderer),
  'patent': _delegate(patentRenderer),
  'data-publication': _delegate(dataPublicationRenderer),
  'periodical': _delegate(periodicalRenderer),
  'software': _delegate(softwareRenderer),
  'thesis': _delegate(thesisRenderer),
  'webpage': _delegate(webpageRenderer)
}


/*
  Helpers
*/
function _renderAuthors($$, entityIds, entityDb) {
  let fragments = []
  entityIds.forEach((entityId, i) => {
    fragments = fragments.concat(
      _delegateEntityRenderer($$, entityId, entityDb, {short: true})
    )
    if (i < entityIds.length - 1) {
      fragments.push(', ')
    }
  })
  return fragments
}

function _renderDOI($$, doi) {
  return $$('a').attr({
    href: `http://dx.doi.org/${doi}`,
    target: '_blank'
  }).append(
    'doi ',
    doi
  )
}

function _getInitials(givenNames) {
  return givenNames.split(' ').map(part => {
    return part[0] ? part[0].toUpperCase() : ''
  }).join('')
}

function _delegateEntityRenderer($$, entityId, entityDb, options) {
  let entity = entityDb.get(entityId)
  return INTERNAL_RENDERER_MAP[entity.type]($$, entityId, entityDb, options)
}

function _renderHTML($$, htmlString) {
  return $$('span').html(htmlString)
}

function _delegate(fn) {
  return function(entityId, db, options) {
    let el = _createElement()
    let $$ = el.createElement.bind(el)
    let fragments = fn($$, entityId, db, options)
    el.append(fragments)
    return el.innerHTML
  }
}

function _createElement() {
  return DefaultDOMElement.parseSnippet('<div>', 'html')
}
