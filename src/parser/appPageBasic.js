'use strict'

module.exports = $ => {
  return {
    play: {
      url: $('.playstore-icon').parent()[0].href,
      id: $('.playstore-icon').parent()[0].href.split('=').pop(),
      category: $('.play-category').text(),
      categoryUrl: $('.play-category')[0].href
    },
    app: {
      name: $('.breadcrumbs').find('a').eq(1).text(),
      url: $('.breadcrumbs').find('a').eq(1)[0].href
    },
    dev: {
      display: $('.dev-title').text(),
      name: $('.dev-title').find('a').text(),
      url: $('.dev-title').find('a')[0].href + '/'
    }
  }
}
