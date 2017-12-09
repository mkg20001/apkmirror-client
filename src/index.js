'use strict'

const get = require('./get')

module.exports = {
  searchForApps: (query, cb) =>
    get('https://www.apkmirror.com/?post_type=app_release&searchtype=app&s=' + encodeURI(query), {parser: 'appSearch'}, cb),
  getAppPage: (app, cb) =>
    get(app.app ? app.app.url : app, {parser: 'appPage'}, cb)
}
