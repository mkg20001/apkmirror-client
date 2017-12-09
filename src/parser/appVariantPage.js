'use strict'

const appPageBasic = require('./appPageBasic')
const cleanText = s => s.replace(/\n/g, '').trim()

function getMatches (string, regex, index) {
  index = index || [1] // default to the first capturing group
  var matches = []
  var match
  while ((match = regex.exec(string))) {
    matches.push(index.map(index => match[index]))
  }
  return matches
}

module.exports = ($, window, cb) => {
  const res = appPageBasic($)
  res.changelog = $('.notes').eq(1).text()
  res.download = $('.downloadButton')[0].href
  const [ver, size, aver, dpi] = $('.appspec-value').toArray()
  console.log(ver)
  res.dpi = cleanText($(dpi).text())
  res.url = window.location.href
  res.size = cleanText($(size).text())
  res.version = getMatches($(aver).text(), /([a-z]+): (.+) \((.+)\) *$/gmi, [1, 2, 3]).map(v => {
    const [name, value, adt] = v
    return [name.toLowerCase(), {
      name: value,
      fullName: adt
    }]
  }).reduce((a, b) => {
    a[b[0]] = b[1]
    return a
  }, {})

  cb(null, res)
}
