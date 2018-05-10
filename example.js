'use strict'

/* eslint-disable max-nested-callbacks */
/* eslint-disable no-console */

const apk = require('apkmirror-client')
const fs = require('fs')

apk.searchForApps('whatsapp', (err, res) => { // search for whatsapp
  if (err) throw err
  let whatsapp = res.filter(r => r.app.name === 'WhatsApp Messenger')[0] // this makes sure we don't get any "whatsapp gold" stuff
  apk.getAppPage(whatsapp, (err, page) => { // now download details
    if (err) throw err
    console.log(page)

    page.versions.filter(v => !v.beta)[0].loadRelease((err, release) => { // now get latest non-beta release
      if (err) throw err
      console.log(release)

      release.estimateBestCandidate('arm64').loadVariant((err, download) => { // now get the arm64 release
        if (err) throw err
        console.log(res)
        download.downloadAPK((err, apk) => { // and finally download the apk
          if (err) throw err
          apk.pipe(fs.createWriteStream('./whatsapp.apk')).on('close', () => { // ...into this file
            console.log('Saved as whatsapp.apk!')
          })
        })
      })
    })
  })
})
