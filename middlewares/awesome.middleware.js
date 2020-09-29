module.exports = {
    name: 'Awesome',
    
    localAction(next, action) {
        return ctx => {
            console.log(`My middleware is called before the ${action.name} action execute`);

            return next(ctx);
        }
    }
}