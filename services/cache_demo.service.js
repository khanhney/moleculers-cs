let CacheCleaner = require('../mixins/cache.cleaner.mixin');

module.exports = {
    name: "cache",
    version: 'development',

    mixins: [CacheCleaner([
        'products',
        'cache_demo'
    ])],
    actions: {
        list: {
            cache: true,
            handler(ctx) {
                this.logger.info('handler called');

                return [
                    { id: 1, name: 'Join' },
                    { id: 2, name: 'Jack' }
                ]
            }
        },

        demo_1: {
            cache: {
                // If params is { limit: 10, offset: 30 } and meta is { user: { id: 123 } },
                keys: ["limit", "offset", "#user.id"]
            },
            handler(ctx) {
                return this.getList(ctx.params.limit, ctx.params.offset);
            }
        },

        clearCacheMultipleService: {
            handler(ctx) {
                this.cleanCacheBroker();

                return {
                    message: 'successed'
                }
            }
        },

    },
    methods: {
        cleanCacheBroker() {
            this.broker.broadcast('cache.clean.users');
        }
    },

    events: {
        'cache.clean.users'() {
            if (this.broker.cacher) {
                this.broker.cacher.clean('user.**');
            }
        }
    }
}