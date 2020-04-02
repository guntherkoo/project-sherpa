const routes = require('next-routes')()
	.add('App', '/', 'index')
	.add({name: 'addlocations', pattern: '/addlocations', page: 'addlocations'})
	.add({name: 'addvloggers', pattern: '/addvloggers', page: 'addvloggers'})
	.add({name: 'addvideos', pattern: '/addvideos', page: 'addvideos'})
	.add('vlogger', '/vlogger/:vlogger', 'vlogger')
	.add('addvideos/:location', '/addvideos/:location', 'addvideos')

module.exports = routes;
