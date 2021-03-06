# Texture [![Build Status](https://travis-ci.org/substance/texture.svg?branch=master)](https://travis-ci.org/substance/texture)

Texture is a toolset for the production of scientific content. It has first-class support for JATS, the de facto standard for archiving and interchange of scientific open-access contents with XML.
![Texture User Interface](texture.png)

## Roadmap

Texture is still at an early alpha stage: there are likely to be missing features, bugs and API changes. But we would :heart: to get your suggestions and :bug: reports.

- ![prod](https://img.shields.io/badge/status-prod-green.svg) = ready for production use
- ![beta](https://img.shields.io/badge/status-beta-yellow.svg) = ready for beta user testing
- ![alpha](https://img.shields.io/badge/status-alpha-red.svg) = ready for alpha testing; use with caution
- Planned for release (e.g. `Alpha 5`)

We generally only plan one or two releases ahead. We aim to do quaterly releases, towards a 1.0 release in 2018. Please see our more detailed [ROADMAP.md](ROADMAP.md) document.

Feature                                 | Ready
:-------------------------------------- | :------------:
General editing                         | ![beta](https://img.shields.io/badge/status-beta-yellow.svg)
Copy & Paste (from Word, etc.)          | ![beta](https://img.shields.io/badge/status-beta-yellow.svg)
Find and Replace                        | ![alpha](https://img.shields.io/badge/status-alpha-red.svg)
Auto-numbered labels (`xref`, `fig`, etc. ) | ![beta](https://img.shields.io/badge/status-beta-yellow.svg)
Reference editing (`element-citation`)  | ![beta](https://img.shields.io/badge/status-beta-yellow.svg)
Authors and Affiliations                | ![beta](https://img.shields.io/badge/status-beta-yellow.svg)
Article Record (`issue`, `fpage`, etc.) | Alpha 5
Translations                            | Unscheduled
Track Changes                           | Unscheduled
PubMed and CrossRef verification of references                           | Unscheduled
Fundref verification                    | Unscheduled
Group authors                           | Unscheduled
**Supported Content**                   |
Paragraph                               | ![prod](https://img.shields.io/badge/status-prod-green.svg)
Heading                                 | ![prod](https://img.shields.io/badge/status-prod-green.svg)
Math                                    | Unscheduled
List                                    | Alpha 5
Blockquote                              | ![prod](https://img.shields.io/badge/status-prod-green.svg)
Figure                                  | ![beta](https://img.shields.io/badge/status-beta-yellow.svg)
Table                                   | ![beta](https://img.shields.io/badge/status-beta-yellow.svg)
Bold & Italic                           | ![prod](https://img.shields.io/badge/status-prod-green.svg)
Ext-Link                                | ![prod](https://img.shields.io/badge/status-prod-green.svg)
Subscript & Superscript                 | ![prod](https://img.shields.io/badge/status-prod-green.svg)


## Usage

See our [examples](examples) for integration scenarios. The best way to start is downloading the zip file from the latest [release](https://github.com/substance/texture/releases).


## Development

Clone the repository.

```bash
$ git clone https://github.com/substance/texture.git
```

Navigate to the source directory.

```bash
$ cd texture
```

Install via npm.

```bash
$ npm install
```

Start the dev server.

```bash
$ npm run start
```

And navigate to [http://localhost:4000](http://localhost:4000).

## License

Texture is open source, and you are legally free to use it commercially. If you are using Texture to make profit, we expect that you help [fund its development and maintenance](http://substance.io/consortium/).

## Credits

Texture is developed by the [Substance Consortium](http://substance.io/consortium/) formed by the [Public Knowledge Project](https://pkp.sfu.ca/2016/04/27/substance-consortium/) (PKP), the [Collaborative Knowledge Foundation](http://coko.foundation/blog.html#substance_consortium) (CoKo), [SciELO](http://www.scielo.org/),  [Érudit](https://apropos.erudit.org/fr/creation-dun-consortium-autour-de-substance/) and [eLife](https://elifesciences.org/).

The following people make Texture possible (in random order):

- Alex Garnett (leadership, concept)
- Juan Pablo Alperin (leadership, concept)
- Alex Smecher (concept, dev)
- Kristen Ratan (leadership)
- Adam Hyde (leadership)
- Jure Triglav (concept, dev)
- Tanja Niemann (leadership)
- Michael Aufreiter (dev)
- Melissa Harrison (requirements)
- Giuliano Maciocci (requirements, concept)
- Naomi Penfold (leadership)
- Nick Duffield (design)
- Davin Baragiotta (concept, dev)
- David Cormier (dev)
- Sophy Ouch (design)
- Fabio Batalha Cunha dos Santos (leadership, concept)
- Oliver Buchtala (dev)
