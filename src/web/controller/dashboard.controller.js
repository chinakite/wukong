let dashboard = async (ctx, next) => {
    ctx.render('index.html', {});
};

module.exports = {
    'GET /' : dashboard
};
