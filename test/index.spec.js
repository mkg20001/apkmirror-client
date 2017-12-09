/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */

'use strict'

const apk = require('../src')

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

let wa

describe('search', () => {
  it('should find whatsapp', cb => {
    apk.searchForApps('whatsapp', (err, res) => {
      expect(err).to.not.exist()
      wa = res.filter(r => r.app.name === 'WhatsApp Messenger')[0]
      expect(wa).to.exist()
      expect(wa.dev.name).to.equal('WhatsApp Inc.')
      expect(wa.app.name).to.equal('WhatsApp Messenger')
      chai.assert(typeof wa.info.version === 'string')
      cb()
    })
  })

  it('should get app page for whatsapp', cb => {
    apk.getAppPage(wa, (err, res) => {
      expect(err).to.not.exist()
      // console.log(res, res.versions)
      wa.page = res
      wa.latest = res.versions.filter(v => !v.beta)[0]
      expect(res.play.url).to.equal('https://play.google.com/store/apps/details?id=com.whatsapp')
      expect(res.play.id).to.equal('com.whatsapp')
      expect(res.play.category).to.equal('Communication')
      expect(res.play.categoryUrl).to.equal('https://www.apkmirror.com/categories/communication/')
      expect(res.app.name).to.equal(wa.app.name)
      expect(res.app.url).to.equal(wa.app.url)
      expect(res.dev.name).to.equal(wa.dev.name)
      expect(res.dev.url).to.equal(wa.dev.url)
      cb()
    })
  })

  it('should get latest non-beta release for whatsapp', cb => {
    wa.latest.loadRelease((err, res) => {
      expect(err).to.not.exist()
      // console.log(res, res.estimateBestCandidate('arm64'))
      wa.latest = res
      wa.dl = res.estimateBestCandidate('arm64')
      expect(res.play.url).to.equal('https://play.google.com/store/apps/details?id=com.whatsapp')
      expect(res.play.id).to.equal('com.whatsapp')
      expect(res.play.category).to.equal('Communication')
      expect(res.play.categoryUrl).to.equal('https://www.apkmirror.com/categories/communication/')
      expect(res.app.name).to.equal(wa.app.name)
      expect(res.app.url).to.equal(wa.app.url)
      expect(res.dev.name).to.equal(wa.dev.name)
      expect(res.dev.url).to.equal(wa.dev.url)
      cb()
    })
  })

  it('should get the variant of that release', cb => {
    wa.dl.loadVariant((err, res) => {
      expect(err).to.not.exist()
      // console.log(res)
      wa.dlfinal = res
      expect(res.play.url).to.equal('https://play.google.com/store/apps/details?id=com.whatsapp')
      expect(res.play.id).to.equal('com.whatsapp')
      expect(res.play.category).to.equal('Communication')
      expect(res.play.categoryUrl).to.equal('https://www.apkmirror.com/categories/communication/')
      expect(res.app.name).to.equal(wa.app.name)
      expect(res.app.url).to.equal(wa.app.url)
      expect(res.dev.name).to.equal(wa.dev.name)
      expect(res.dev.url).to.equal(wa.dev.url)
      cb()
    })
  })

  it('should download the apk', cb => {
    wa.dlfinal.downloadAPK((err, apk) => {
      expect(err).to.not.exist()
      apk.pipe(require('fs').createWriteStream(require('path').join(require('os').tmpdir(), Math.random().toString())))
      apk.once('data', () => cb())
    })
  })
})
