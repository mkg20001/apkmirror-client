'use strict'

const request = require('request')
const debug = require('debug')
const log = debug('apkmirror-client')

module.exports = {
  searchForApps: (query, cb) =>
    get('https://www.apkmirror.com/?post_type=app_release&searchtype=app&s=' + encodeURI(query), {parser: 'appSearch'}, cb),
  getAppPage: (app, cb) =>
    get(app.app ? app.app.url : app, {parser: 'appPage'}, cb),
  getReleasePage: (app, cb) =>
    get(app, {parser: 'appReleasePage'}, cb),
  appVariantPage: (app, cb) =>
    get(app, {parser: 'appVariantPage'}, cb),
  estimateBestCandidate: (list, arch) => {
    const orig = list
    if (arch === 'x86_64') arch = ['x64']
    if (arch === 'arm64') arch = ['arm64', 'arm']
    if (!Array.isArray(arch)) arch = [arch]
    list = list.filter(r => arch.indexOf(r.arch) !== -1) // only ones that have the right arch
    list = list.map(r => Object.assign({}, r)).map(r => {
      r.date = new Date(r.date)
      r.arch_i = arch.indexOf(r.arch)
      return r
    })

    /*
    Rating:
      - Arch index: Lower => Better
      - Date: Higher => Better
      - Id: Higher => Better
      - Target Android Version: Lower => Better
      - DPI: Highest DPI => Better, nodpi => Best
    */

    function comp (a, b, r) {
      if (r) {
        if (a > b) return -1
        if (a < b) return 1
      }
      if (a < b) return -1
      if (a > b) return 1
      return 0
    }

    list.sort((a, b) => {
      if (comp(a.arch_i, b.arch_i, true)) return comp(a.arch_i, b.arch_i, true) // first get the fastest arch
      if (comp(a.androidVer, b.androidVer, true)) return comp(a.androidVer, b.androidVer, true) // get the apk with lowest required version
      if (comp(a.date, b.date)) return comp(a.date, b.date) // newest apk
      return 0
    })

    const res = list.pop()
    return res ? orig.filter(i => i.id === res.id)[0] : false
  },
  downloadAPK: (url, cb) => {
    get(url, {parser: 'appDownloadPage'}, (err, url) => {
      if (err) return cb(err)
      log('download apk from %s', url)
      cb(null, request.get(url))
    })
  }
}

const get = require('./get')
