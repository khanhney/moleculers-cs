"use strict";

const { contextParamsCloning } = require('../moleculer.config');

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "greeter",

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		random(ctx) {
			let { num } = ctx.params;
			this.logger.info({ num });
            return Math.round(Math.random() * 100) + num;
        },
		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		hello: {
			rest: {
				method: "GET",
				path: "/hello/:name"
			},
			params: {
				name: "string"
			},
			strategy: "Shard",
			strategyOptions: { // not test
				/**
				 * Strategy options:
				 * 	 shardKey: string
				 * 	 vnodes  : Number of virtual nodes
				 *   ...
				 */

				//  giải thích: strategy của LoadBalancer GLOBAL là RoundRobin -> nhưng vẫn có thể overrite trong từng action/service
				shardKey: "name" //có thể lấy qua params
			},
			/**
			 * @param {Context} ctx
			 */
			async handler(ctx) {
				// return "Hello Moleculer";
				const payload = `Hello from greeter @${this.broker.nodeID}`;

				ctx.emit('hello.called', payload);

				let numRandom = await ctx.call('helper.random');

				let listProducts = await ctx.call('helper.listProducts');

				return { payload, numRandom, listProducts };
			}
		},

		/**
		 * Welcome, a username
		 *
		 * @param {String} name - User name
		 */
		welcome: {
			rest: "/welcome",
			params: {
				name: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				return `Welcome, ${ctx.params.name}`;
			}
		},

		async get(ctx) {
			let priceProduct = ctx.params.priceProduct;

			let infoProduct = await ctx.call('helper.getProduct', { priceProduct })

			return infoProduct;
		},

		
	},

	/**
	 * Events
	 */
	events: {
		'order.created': {
			handler(ctx) {
				this.logger.info('--------GREETER SERVICES------')
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	},

	settings: {
        $dependencyTimeout: 30 * 1000 // Default: 0 - no timeout
	},
	
	dependencies: [
		"helper"
	]
};
