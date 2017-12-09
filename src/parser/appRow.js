'use strict'

module.exports = (e, e2, $, full) => {
  const base = {
    icon: e.find('img')[0].src,
    name: e.find('.appRowTitle')[0].title,
    url: e.find('.appRowTitle').find('a')[0].href
  }
  const res = {}
  if (full) {
    res.app = base
    res.dev = {
      display: e.find('.byDeveloper').text(),
      name: e.find('.byDeveloper').text().substr(3),
      url: e.find('.byDeveloper')[0].href
    }
  } else {
    res.details = base
  }
  res.info = e2.children().toArray()
    .reduce((obj, e) => {
      obj[$(e).find('.infoslide-name').text().replace(':', '').toLowerCase().replace(/ /g, '')] = $(e).find('.infoslide-value').text()
      return obj
    }, {})
  return res
}
