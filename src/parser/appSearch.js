'use strict'

const debug = require('debug')
const log = debug('apkmirror-client:app:search')

const appRow = require('./appRow')

module.exports = ($, window, cb) => {
  let i = -1
  const res = $('#content').find('.appRow:not(.center)').toArray().map(e => $(e)).map(e => {
    i++
    return appRow(e, $($('#content').find('.infoSlide')[i]), $, true)
  })
  res.hasNextPage = $('#content').find('.appRow.center').text().indexOf('Next >') !== -1

  log('search found %s results', res.length)

  cb(null, res)
}
