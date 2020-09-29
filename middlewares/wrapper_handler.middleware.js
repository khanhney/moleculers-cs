const MyDoSomethingMiddleware = {
    localAction(next, action) {
        if (action.myFunc) {
            return ctx => {
                doSomethingBeforeHandler(ctx);

                return next(ctx)
                    .then(res => {
                        // do something
                        return res;
                    })
                    .catch(err => {
                        // do something
                        throw err;
                    })
            }
        }

        return next;
    }
}