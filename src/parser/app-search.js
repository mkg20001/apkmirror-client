module.exports = ($, _, cb) => {
  let i = -1
  const res = $('#content').find('.appRow').toArray().map(e => $(e)).map(e => {
    i++
    return {
      app: {
        icon: e.find('img')[0].src,
        name: e.find('.appRowTitle').text().replace(/\n/g, '').trim(),
        url: e.find('.appRowTitle').find('a')[0].href
      },
      dev: {
        display: e.find('.byDeveloper').text(),
        name: e.find('.byDeveloper').text().substr(3),
        url: e.find('.byDeveloper')[0].href
      },
      info: $($('#content').find('.infoSlide')[i]).children().toArray()
        .reduce((obj, e) => {
          obj[$(e).find('.infoslide-name').text().replace(':', '').toLowerCase()] = $(e).find('.infoslide-value').text()
          return obj
        }, {})
    }
  })
  cb(null, res)
}
