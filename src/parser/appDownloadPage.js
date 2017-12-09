'use strict'

module.exports = ($, window, cb) => {
  cb(null, $('a[rel=nofollow]')[0].href)
}
