const express = require('express');
const nextjs = require('next');
const compression = require('compression');

const app = nextjs({ dev: process.env.NODE_ENV !== 'production' });
const routes = require('./routes');
const handler = routes.getRequestHandler(app, ({req, res, route, query}) => {
  app.render(req, res, route.page, query)
})


global.fetch = require('isomorphic-unfetch');

app
	.prepare()
	.then(() => {
		const server = express();
		server.use(compression());
		//server start with next routing
		server.get('/favicon.ico', (req, res, next) => (
			res.status(200).sendFile('favicon.ico', {root: __dirname + '/static/'})
		));
		
		server.use(handler).listen(8888, (err) => {
			if (err) throw err
				console.log('SSR Server ready on http://localhost:8888')
		});

		

		server.get('/p/:city', (req, res, next) => (
			app.render(req, res, '/', {city: req.params.city})
		));

		// server.get('/:city/:vlogger', (req, res, next) => (
		// 	app.render(req, res, '/', {
		// 		vlogger: req.params.vlogger,
		// 		city: req.params.city
		// 	})
		// ));
		// server.get('/:city/:vlogger/:vlog', (req, res, next) => (
		// 	app.render(req, res, '/', {
		// 		vlogger: req.params.vlogger,
		// 		city: req.params.city,
		// 		vlog: req.params.vlog,
		// 	})
		// ));

		server.get('/addlocations', (req, res, next) => (
			app.render(req, res, '/addlocations', {})
		));
		server.get('/addvideos', (req, res, next) => (
			app.render(req, res, '/addvideos', {})
		));
		server.get('/addvloggers', (req, res, next) => (
			app.render(req, res, '/addvloggers', {})
		));


	   
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});
