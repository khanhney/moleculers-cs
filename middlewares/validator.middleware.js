const MyValidator = {
    localAction(next, action) {
        // wrap with a param validator if 'action.params' is defined
        if (action.params.hasOwnProperty('_id')) {
            return ctx => {
                this.validate(action.params, ctx.params);

                return next(ctx);
            }
        }

        return next;
    }
}