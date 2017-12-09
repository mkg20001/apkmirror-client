'use strict'

const appRow = require('./appRow')

module.exports = ($, window, cb) => {
  const main = $('#primary')
  const cell = [
    e => [ // name & app version
      {key: 'name', value: e.find('a').eq(0).text().trim()},
      {key: 'url', value: e.find('a').eq(0)[0].href},
      {key: 'version', value: e.find('a').eq(1).text()},
      {key: 'versionUrl', value: e.find('a').eq(1)[0].href}
    ],
    e => [ // arch
      {key: 'arch', value: e.children().text()},
      {key: 'archUrl', value: e.children()[0].href}
    ],
    e => [ // arch
      {key: 'version', value: e.children().text()},
      {key: 'versionUrl', value: e.children()[0].href}
    ],
    e => [ // arch
      {key: 'dpi', value: e.children().text()},
      {key: 'dpiUrl', value: e.children()[0].href}
    ]
  ]
  const res = {
    notes: main.find('.notes').eq(1).text(),
    play: {
      url: $('.playstore-icon').parent()[0].href,
      id: $('.playstore-icon').parent()[0].href.split('=').pop(),
      category: $('.play-category').text(),
      categoryUrl: $('.play-category')[0].href
    },
    app: {
      name: $('.app-title')[0].title,
      url: window.location.href
    },
    dev: {
      display: $('.dev-title').text(),
      name: $('.dev-title').find('a').text(),
      url: $('.dev-title').find('a')[0].href
    }
  }
  let i = -1
  res.versions = main.find('.listWidget').eq(0).find('.appRow').toArray().map(e => $(e)).map(e => {
    i++
    return appRow(e, $(main.find('.listWidget').find('.infoSlide')[i]), $)
  }).map(v => {
    v.id = v.info.version
    v.version = v.info.version
    v.beta = v.details.name.endsWith(' beta')
    return v
  })
  res.variants = $('#variants').find('.table-row').toArray().slice(1).map(e => $(e).find('.table-cell').toArray()).map((row, i) => {
    return row.map((e, ii) => cell[ii]($(e), i)).reduce((a, b) => a.concat(Array.isArray(b) ? b : [b])).reduce((obj, v) => {
      obj[v.key] = v.value
      return obj
    }, {})
  })
  cb(null, res)
}
