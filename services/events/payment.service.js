module.exports = {
    name: 'payment',
    version: "stagging",
    
    events: {
        "order.created": {
            // register handler to the "other" group instead of "payment" group
            group: "other",
            handler(ctx) {
                this.logger.info("Payload:", ctx.params);
                this.logger.info("Sender:", ctx.nodeID);
                this.logger.info("Metadata:", ctx.meta);
                this.logger.info("The called event name:", ctx.eventName);
            }
        }
    }
}