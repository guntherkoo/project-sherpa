const routes = require('next-routes')()
	.add('App', '/', 'index')
	.add({name: 'city', pattern:'/p/:city', page: 'index'})
	.add({name: 'vlogger', pattern:'/p/:city/:vlogger', page: 'index'})
	.add({name: 'vlog', pattern:'/p/:city/:vlogger/:vlog', page: 'index'})
	.add({name: 'addlocations', pattern: '/addlocations', page: 'addlocations'})
	.add({name: 'addvloggers', pattern: '/addvloggers', page: 'addvloggers'})
	.add({name: 'addvideos', pattern: '/addvideos', page: 'addvideos'})
	.add('addvideos/:location', '/addvideos/:location', 'addvideos')

module.exports = routes;
