const routes = require('next-routes')()
	.add('App', '/', 'Index')
	.add('Add', '/add', 'Add')
	// .add( 'addlocations', '/addlocations', 'addlocations')
	// .add('about', '/about', 'about')
	//.add('/:noname/:lang(en|es)/:wow+', 'complex')
	.add({name: 'addlocations', pattern: '/addlocations', page: 'addlocations'})
	.add({name: 'addvloggers', pattern: '/addvloggers', page: 'addvloggers'})
	.add({name: 'addvideos', pattern: '/addvideos', page: 'addvideos'})

module.exports = routes;
