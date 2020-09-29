// localstorage SERVER

module.exports = {
    name: "lc",
    version: "stagging",

    hooks: {
        before: {
            async get(ctx) {
                const entity = {
                    usr: 'Khánh Ney',
                    email: 'khanhney.dev@gmail.com'
                }

                ctx.locals.entity = entity;
            }
        }
    },

    actions: {
        get: {
            params: {
                id: "number"
            },
            handler(ctx) {
                let entitySavedLocalStorage = ctx.locals.entity;
                let id                      = ctx.params.id;

                this.logger.info({ entitySavedLocalStorage, id })
                return entitySavedLocalStorage;
            }
        }
    }
}