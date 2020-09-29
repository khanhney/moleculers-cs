module.exports = {
    name: 'validator',
    version: 'stagging',

    actions: {
        hello: {
            params: {
                name: { type: "string", min: 2 },
                user: { type: "object", props: {
                    username: "string",
                    password: "string",
                    zip: "number"
                } }
            },

            handler(ctx) {
                return `hello ${ctx.params.name}`
            }
        },

        get: {
            params: {
                id: { type: "number", positive: true, integer: true },
                name: { type: "string", min: 3, max: 255 },
                status: "number"
            },
            handler(ctx) {
                return `id: ${ctx.params.id} - name: ${ctx.params.name} - status: ${ctx.params.status}`
            }
        }
    }
}