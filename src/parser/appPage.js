'use strict'

const debug = require('debug')
const log = debug('apkmirror-client:app:page')

const appRow = require('./appRow')
const appPageBasic = require('./appPageBasic')
const get = require('..')

module.exports = ($, window, cb) => {
  const main = $('#primary')
  const cell = [
    e => [ // name & app version
      {key: 'name', value: e.find('a').eq(0).text().trim()},
      {key: 'url', value: e.find('a').eq(0)[0].href},
      {key: 'version', value: e.find('a').eq(1).text()},
      {key: 'versionUrl', value: e.find('a').eq(1)[0].href},
      {key: 'loadRelease', value: get.getReleasePage.bind(null, e.find('a').eq(1).text())}
    ],
    e => [ // arch
      {key: 'arch', value: e.children().text()},
      {key: 'archUrl', value: e.children()[0].href}
    ],
    e => [ // android version
      {key: 'androidVer', value: e.children().text()},
      {key: 'androidVerUrl', value: e.children()[0].href}
    ],
    e => [ // dpi
      {key: 'dpi', value: e.children().text()},
      {key: 'dpiUrl', value: e.children()[0].href}
    ]
  ]
  const res = appPageBasic($)
  res.notes = main.find('.notes').eq(1).text()
  let i = -1
  res.versions = main.find('.listWidget').eq(0).find('.appRow').toArray().map(e => $(e)).map(e => {
    i++
    return appRow(e, $(main.find('.listWidget').find('.infoSlide')[i]), $)
  }).map(v => {
    v.id = v.info.version
    v.version = v.info.version
    v.beta = v.details.name.endsWith(' beta')
    v.loadRelease = get.getReleasePage.bind(null, v.details.url)
    return v
  })
  res.variants = $('#variants').find('.table-row').toArray().slice(1).map(e => $(e).find('.table-cell').toArray()).map((row, i) => {
    return row.map((e, ii) => cell[ii]($(e), i)).reduce((a, b) => a.concat(Array.isArray(b) ? b : [b])).reduce((obj, v) => {
      obj[v.key] = v.value
      return obj
    }, {})
  })

  log('got app page for %s', JSON.stringify(res.app.name))
  cb(null, res)
}
