module.exports = function(serviceNames) {
    const events = {};

    serviceNames.forEach(name => {
        events['cache.clean.${name}'] = function() {
            if (this.broker.cacher) {
                this.logger.debug(`Clean local ${this.name} cache`);
                this.broker.cacher.clean(`${this.name}.*`)
            }
        }
    })

    return events;
}