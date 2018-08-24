'use strict'

module.exports = $ => {
  return {
    play: {
      url: $('.playstore-icon').parent()[0].href,
      id: $('.playstore-icon').parent()[0].href.split('=').pop(),
      category: $('.play-category').length ? $('.play-category').text() : null,
      categoryUrl: $('.play-category').length ? $('.play-category')[0].href : null
    },
    app: {
      name: $('.breadcrumbs').find('a').eq(1).text(),
      url: $('.breadcrumbs').find('a').eq(1)[0].href,
      icon: $('.siteTitleBar').find('img')[0].src
    },
    dev: {
      display: $('.dev-title').text(),
      name: $('.dev-title').find('a').text(),
      url: $('.dev-title').find('a')[0].href + '/'
    }
  }
}
