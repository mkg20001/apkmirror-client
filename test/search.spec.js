/* eslint-env mocha */
/* eslint-disable max-nested-callbacks */

'use strict'

const apk = require('../src')

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

describe('search', () => {
  it('should find whatsapp', cb => {
    apk.searchForApps('whatsapp', (err, res) => {
      expect(err).to.not.exist()
      const wa = res.filter(r => r.app.name === 'WhatsApp Messenger')[0]
      expect(wa).to.exist()
      expect(wa.dev.name).to.equal('WhatsApp Inc.')
      expect(wa.app.name).to.equal('WhatsApp Messenger')
      cb()
    })
  })
})
