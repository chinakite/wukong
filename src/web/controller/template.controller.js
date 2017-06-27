const template       = require('../../template/template');
const Base64        = require('js-base64').Base64;

const logger        = require('../../log/log');


let templateMgr = async (ctx, next) => {
    ctx.render('template/template.html', {});
};

let loadTemplates = async (ctx, next) => {
	let result = [];

    let allTemplates = template.getTmplDefs();

	for(let dataKey in allTemplates) {
		let tmplDef = allTemplates[dataKey];
        var tmpl = {};
        tmpl['dataKey'] = dataKey;
        tmpl['tmplDef'] = tmplDef;
		result.push(tmpl);
	}
	ctx.response.set({
		"Content-Type": "application/json",
		'Cache-Control': 'no-cache'
	});
	ctx.response.body = result;
};

let loadTemplate = async (ctx, next) => {
    logger.debug("GET /__man__/data/:dataKey entry");

    let allTemplates = template.getTmplDefs();

	let dataKey = ctx.params.dataKey;
	dataKey = Base64.decode(dataKey);

    logger.debug("param dataKey = " + dataKey);

	ctx.response.set({
		"Content-Type": "application/json",
		'Cache-Control': 'no-cache'
	});
    logger.debug("return " + allTemplates[dataKey]);
	ctx.response.body = allTemplates[dataKey];
};

let saveTemplate = async (ctx, next) => {
    let allTemplates = template.getTmplDefs();

	let dataKey = ctx.params.dataKey;
	dataKey = Base64.decode(dataKey);

    //TODO: Need validation;
	let postData = ctx.request.body;
	allTemplates[dataKey] = postData;

	ctx.response.set({
		'Cache-Control': 'no-cache'
	});
	ctx.response.body = 'true';
};

module.exports = {
    'GET /__man__/templatemgr' : templateMgr,
    'GET /__man__/templates' : loadTemplates,
    'GET /__man__/template/:dataKey' : loadTemplate,
    'POST /__man__/template/:dataKey': saveTemplate
};
