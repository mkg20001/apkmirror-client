'use strict'

const semverCompare = require('semver-compare')

module.exports = (varints) => {
  try {
    let latest = varints.filter(v => !v.beta).map(v => v.version).sort(semverCompare).pop()
    let latestBeta = varints.filter(v => v.beta).map(v => v.version).sort(semverCompare).pop()

    return varints.map(v => {
      v.isLatest = v.version === (v.beta ? latestBeta : latest)
      return v
    })
  } catch (e) {
    console.error('Unable to semver comapre! Please report! %s', e.stack)
    return varints
  }
}
