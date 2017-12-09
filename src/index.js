'use strict'

const get = require('./get')

module.exports = {
  searchForApps: (query, cb) =>
    get('https://www.apkmirror.com/?post_type=app_release&searchtype=app&s=' + encodeURI(query), {parser: 'app-search'}, cb)
}
