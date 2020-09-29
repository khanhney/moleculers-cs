const MyCacher = {
    localAction(next, action) {
        return async function cacheMiddleware(ctx) {
            let CACHE_KEY = this.getCacheKey(action.name, ctx.params, action.cache.keys);
            let content   = await this.get(CACHE_KEY);

            if (content) {
                ctx.cacheResult = true;
                return content;
            }

            // call the next
            let result = await next(ctx);
            
            // save cache
            this.set(CACHE_KEY, result);
            return result;
        }.bind(this);
    }
}