'use strict'

const jsdom = require('jsdom')
const { JSDOM } = jsdom
const jquery = require('jquery')
const Queue = require('data-queue')
const debug = require('debug')
const log = debug('apkmirror-client:get')

let q = global.APKMIRROR_QUEUE
let newQ
if (!q) {
  q = global.APKMIRROR_QUEUE = Queue()
  newQ = true
}

module.exports = (url, opt, cb) => {
  log('queue get for %s', url)
  q.append({url, opt, cb})
}

function Crawl (url, opt, cb) {
  JSDOM.fromURL(url, {
    scripts: [],
        // userAgent:"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    resourceLoader: function (resource, callback) {
          // var pathname = resource.url.pathname;
      console.log('[%s] => %s', url, resource.url)
      return resource.defaultFetch(callback)
    }
  }).then(dom => {
    const {window} = dom
    var $ = jquery(window)
    try {
      require('./parser/' + opt.parser)($, window, cb, (err, res) => {
        if (err) console.error('Crawler Error: %s', err.toString())
        return cb(err, res)
      })
    } catch (err) {
      console.error('Crawler Error: %s', err.toString())
      return cb(err)
    }
  }, cb)
}

function getQueue () {
  q.get((err, res) => {
    if (err) return
    if (res) {
      const {url, opt, cb} = res
      log('execute get for %s', url)
      Crawl(url, opt, (err, res) => {
        setTimeout(getQueue, err ? 2500 : 500)
        setImmediate(() => cb(err, res))
      })
    }
  })
}

if (newQ) getQueue()
