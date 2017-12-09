'use strict'

const appRow = require('./appRow')

module.exports = ($, window, cb) => {
  let i = -1
  const res = $('#content').find('.appRow').toArray().map(e => $(e)).map(e => {
    i++
    return appRow(e, $($('#content').find('.infoSlide')[i]), $, true)
  })
  cb(null, res)
}
