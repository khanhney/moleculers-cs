module.exports = {
    methods: {
        checkIsAuthenticated(ctx) {
            // if (!ctx.meta.user)
            if (!ctx.params.user)
                throw new Error("Unauthenticated");
                // return { error: true, message: 'Unauthenticated' }
        },
        checkUserRole(ctx) {
            if (ctx.action.role && ctx.meta.user.role != ctx.action.role)
                throw new Error("Forbidden");
        },
        checkOwner(ctx) {
            // Check the owner of entity
        }
    }
}