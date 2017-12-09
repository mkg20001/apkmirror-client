'use strict'

const appPageBasic = require('./appPageBasic')
const cleanText = s => s.replace(/\n/g, '').trim()
const get = require('..')

const cell = [
  e => [ // name & id
    {key: 'date', value: cleanText(e.find('.dateyear_utc').text())},
    {key: 'id', value: cleanText(e.find('a').eq(0).text())},
    {key: 'url', value: e.find('a').eq(0)[0].href},
    {key: 'loadVariant', value: get.appVariantPage.bind(null, e.find('a').eq(0)[0].href)}
  ],
  e => [ // arch
    {key: 'arch', value: cleanText(e.text())}
  ],
  e => [ // android Version
    {key: 'androidVer', value: cleanText(e.text())}
  ],
  e => [ // dpi
    {key: 'dpi', value: cleanText(e.text())}
  ]
]

module.exports = ($, window, cb) => {
  const res = appPageBasic($)
  res.changelog = $('.notes').eq(1).text()
  res.variants = $('.variants-table').find('.table-row').toArray().slice(1).map(e => $(e).find('.table-cell').toArray()).map((row, i) => {
    return row.map((e, ii) => cell[ii]($(e), i)).reduce((a, b) => a.concat(Array.isArray(b) ? b : [b])).reduce((obj, v) => {
      obj[v.key] = v.value
      return obj
    }, {})
  })
  res.estimateBestCandidate = get.estimateBestCandidate.bind(null, res.variants)

  cb(null, res)
}
