const { LoaderOptionsPlugin } = require('webpack');
const compose = require('next-compose');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { parsed: localEnv } = require('dotenv').config()
const Dotenv = require('dotenv-webpack');
const path = require('path');

const sass = {
	cssModules: true,
	cssLoaderOptions: {
		importLoaders: 1,
		localIdentName: '[name]-[local]-[hash:base64:5]',
	},
};

// const isProd = process.env.NODE_ENV === 'production';

module.exports = Object.assign(
	compose([
		[withCSS],
		[withSass, sass],
		{
			webpack: (config, options) => {
				config.plugins.push(new LodashModuleReplacementPlugin({
					shorthands: true,
				}));
				config.plugins.push(new Dotenv({
					path: path.join(__dirname, '.env'),
					systemvars: true
				}));
				config.module.rules.unshift({
					test: /\.scss$/,
					use: ['classnames-loader'],
				});

				return config;
			},
		}
	]),
	{
		target: 'serverless',
		// generateBuildId: async () => {
		// // const fromGit = await nextBuildId({
		// //   dir: __dirname,
		// // });

		// return process.env.GIT_COMMIT || "localMachine";
		// },
	}
);
