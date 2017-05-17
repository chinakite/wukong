const mapping       = require('../../mapping/mapping');
const Base64        = require('js-base64').Base64;

const logger        = require('../../log/log');

let mappingMgr = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.render('mapping/mappings.html', {});
};

let loadMappings = async (ctx, next) => {
	let result = [];

    let mappings = mapping.getMappings();

	for(let api in mappings) {
		let apiMappingDef = mappings[api];
		for(let method in apiMappingDef) {
			let methodDef = apiMappingDef[method];
			let item = {};
			item['url'] = api;
			item['method'] = method;
			item['type'] = methodDef['type'];
			item['dataKey'] = methodDef['dataKey'];
			item['count'] = methodDef['count'];
			result.push(item);
		}
	}
	ctx.response.set({
		"Content-Type": "application/json",
		'Cache-Control': 'no-cache'
	});
	ctx.response.body = result;
};

let loadMapping = async (ctx, next) => {
    logger.debug("GET /__man__/mapping/:key entry");

    let mappings = mapping.getMappings();

	let key = ctx.params.key;
	key = Base64.decode(key);
	let parameters = key.split(/\s/);
	let url = parameters[0];
	let method = parameters[1];

    logger.debug("param url = " + url);
    logger.debug("param method = " + method);

	ctx.response.set({
		"Content-Type": "application/json",
		'Cache-Control': 'no-cache'
	});
    logger.debug("return " + mappings[url][method]);
	ctx.response.body = mappings[url][method];
};

let saveMapping = async (ctx, next) => {
    let mappings = mapping.getMappings();

	let key = ctx.params.key;
	key = Base64.decode(key);
	let parameters = key.split(/\s/);
	let url = parameters[0];
	let method = parameters[1];

	let postData = ctx.request.body;
	mappings[url][method]['type'] = postData['type'];
	mappings[url][method]['dataKey'] = postData['dataKey'];
	mappings[url][method]['count'] = postData['count'];

	ctx.response.set({
		'Cache-Control': 'no-cache'
	});
	ctx.response.body = 'true';
};

module.exports = {
    'GET /__man__/mappingmgr' : mappingMgr,
    'GET /__man__/mappings' : loadMappings,
    'GET /__man__/mapping/:key' : loadMapping,
    'POST /__man__/mapping/:key' : saveMapping
};
