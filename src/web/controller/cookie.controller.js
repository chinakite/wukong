const logger        = require('../../log/log');

let loadCookies = async (ctx, next) => {
    logger.debug("GET /__man__/cookies");
	ctx.response.set({
		"Content-Type": "application/json",
		'Cache-Control': 'no-cache'
	});
    logger.debug("return " + JSON.stringify(ctx.cookies));
	ctx.response.body = ctx.cookies;;
};

let saveCookies = async (ctx, next) => {
    logger.debug("POST /__man__/cookies");

	ctx.response.set({
		"Content-Type": "application/json",
		'Cache-Control': 'no-cache'
	});
    logger.debug("return " + ctx.cookies);
	ctx.response.body = ctx.cookies;;
};

module.exports = {
    'GET /__man__/cookies' : loadCookies,
    'POST /__man__/cookies' : saveCookies
};
