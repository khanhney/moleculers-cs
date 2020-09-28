const myAuthorizeMixin = require('../mixins/auth/authorize.mixin');

module.exports = {
    name: 'auth_test',
    // version: 'development',

    mixins: [myAuthorizeMixin],
    hooks: {
        before: {
            "*": ["checkIsAuthenticated"], //authorize.js
            "manualFunc": ["checkUserRole"],
            "manualFunc2": ["checkUserRole", "checkOwner"]
        }
    },

    actions: {
        manualFunc(ctx) {
            return { message: 'pass' };
        }
    }
}