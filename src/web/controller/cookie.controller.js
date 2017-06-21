const logger        = require('../../log/log');

let loadCookies = async (ctx, next) => {
    logger.debug("GET /__man__/cookies");
	ctx.response.set({
		"Content-Type": "application/json",
		'Cache-Control': 'no-cache'
	});
    logger.debug("return " + readCookies(ctx));
	ctx.response.body = readCookies(ctx);
};

let saveCookies = async (ctx, next) => {
    logger.debug("POST /__man__/cookies");

    let cookies = readCookies(ctx);
    for(let i=0; i<cookies.length; i++) {
        let d = new Date();
        d.setTime(d.getTime()-1);
        ctx.cookies.set(cookies[i].name, '', {expires: d});
    }

    let postData = ctx.request.body;
    for(let key in postData) {
        let v = postData[key];
        ctx.cookies.set(key, v, {maxAge:300000});
    }
	ctx.response.set({
		"Content-Type": "application/json",
		'Cache-Control': 'no-cache'
	});
	ctx.response.body = {code: 200, msg: "success" };
};

function readCookies(ctx) {
    let headerCookie = ctx.request.headers["cookie"];
    let result = [];
    if(headerCookie) {
        let cookieStrArr = headerCookie.split(";");
        for(let i=0; i<cookieStrArr.length; i++) {
            let cookieKeyValueStr = cookieStrArr[i];
            let cookieKeyValue = cookieKeyValueStr.trim().split("=");
            let cookie = {};
            cookie['name'] = cookieKeyValue[0];
            cookie['value'] = cookieKeyValue[1];
            result.push(cookie);
        }
    }

    return result;
}

module.exports = {
    'GET /__man__/cookies' : loadCookies,
    'POST /__man__/cookies' : saveCookies
};
