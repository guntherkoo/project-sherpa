const routes = require('next-routes')()
	.add('App', '/', 'Index')
	.add('Add', '/add', 'Add')
	// .add('about', '/about', 'about')
	//.add('/:noname/:lang(en|es)/:wow+', 'complex')
	//.add({name: 'beta', pattern: '/v3', page: 'v3'})

module.exports = routes;
