module.exports ={
    name: "helper",

    // PUBLISH function
    actions: {
        random(ctx) {
			let { num } = ctx.params;
			this.logger.info({ num });
            return Math.round(Math.random() * 100) + num;
        },

        listProducts(ctx) {
            return [
                { name: "Apples", price: 5 },
                { name: "Oranges", price: 3 },
                { name: "Bananas", price: 2 }
            ];
        },

        async getProduct(ctx) {
            let priceProduct = ctx.params.priceProduct;

            let listProducts = await ctx.call('helper.listProducts');
            this.logger.info({ listProducts, priceProduct })

            let productByPrice = listProducts.find(item => item.price == Number(priceProduct));
            this.logger.info({ productByPrice })
            return productByPrice;
        },

        mult: {
            cache: false,
            params: {
                a: "number",
                b: "number"
            },
            handler(ctx) {
                // The action properties are accessible as `ctx.action.*`
                this.logger.info({ ctxMult: ctx.action.cache })
                if (!ctx.action.cache)
                    return Number(ctx.params.a) * Number(ctx.params.b);
            }
        },

        async sendMail(ctx) {
            let result = await this._sendMail();
            this.logger.info({ result });
            return result;

            // internal call
            // let numRandom = await this.actions.random();
            // return { numRandom, result };
        },
        
        testHooks: {
            hooks: {
                before(ctx) { // RUN 1
                    this.logger.info('Before Action Hook');
                },
                after(ctx, res) { // RUN 3
                    this.logger.info('After Action Hook');
                    this.logger.info({ res });
                    return res;
                }
            },
            handler(ctx) { // RUN 2
                this.logger.info("Action handler");
                return `Hello ${ctx.params.name}`;
            }
        },

        balancedEvent: {
            handler(ctx) {
                return ctx.emit('order.created', { message: 'hello_world' }, ['payment'])
            }
        },

        broadcastEvent: {
            handler(ctx) {
                // Send to all "payment" service instances
                // ctx.broadcast('order.created', { message: 'hello_broadcast' }, 'payment');

                // Send to all "payment" & "greeter" service instances.
                ctx.broadcast('order.created', { message: 'hello_broadcast' }, ['payment', 'greeter']);
                
                return;
            }
        }
        
    },

    // PRIVATIE function
    /**
     * can’t be called with broker.call
     *  -> But you can call it inside service (from action handlers, event handlers and lifecycle event handlers).
     */
    methods: {
        // send an email to recipients
        _sendMail(recipients, subject, body) {
            return new Promise(resolve => {
                setTimeout(_ => resolve({ message: 'hello_world' }),3000)
            })
        }
    },

    // subscribe to events under the events key
    events: {
        "greeter.get" (ctx) {
            this.logger.info({ ctx })
        },

        // Subscribe to all 'greeter.*' events
        "greeter.*"(ctx) {
            this.logger.info("Payload:", ctx.params);
            this.logger.info("Sender:", ctx.nodeID);
            this.logger.info("Metadata:", ctx.meta);
            this.logger.info("The called event name:", ctx.eventName);
        },

        // Subscribe to a local event
        "$node.connected"(ctx) {
            this.logger.info(`Node '${ctx.params.id}' is connected!`);
        }
    },
}