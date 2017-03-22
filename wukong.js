const Koa     = require('koa');
const router  = require('koa-router')();
const favicon = require('koa-favicon');
const logger  = require('tracer').colorConsole({level:'debug'});

const app     = new Koa();

const config        = require('./wukong.config');
const mapping       = require('./src/mapping/mapping');
const dataset       = require('./src/dataset/dataset');
const template      = require('./src/template/template');
const gen           = require('./src/generator/generator');

let mappings = {};		//store mappings
let dataSet  = {};		//store defined datas
let tmplSet  = {};		//store templates

function startup() {
	//1. Load mappings.
	logger.info("Loading mappings ... ");
	let mappingCount = mapping.loadMappings(config, mappings);
	logger.info("%d mappings are loaded. ", mappingCount);

	//2. Load defined data set
	logger.info("Loading defined datas ... ");
	let dataCount = dataset.loadDatas(config, dataSet);
	logger.info("%d data definitions are loaded. ", dataCount);

	//3. Load data templates
	logger.info("Loading templates ... ");
	let tmplCount = template.loadTemplates(config, tmplSet);
	logger.info("%d templates are loaded. ", tmplCount);
}

startup();

app.use(favicon(process.cwd() + '/favicon.ico'));

//route /man to router
app.use(async (ctx, next) => {
	let url = ctx.request.url;
    logger.debug("Request url : [ %s ]", url);

    //some restful request is parsed endsWith slash. If it's not root context,
    //drop it!
	if(url && url.length > 1 && url.endsWith('/')) {
		url = url.substring(0, url.length-1);
	}

	if(url.startsWith('/__man__')) {   //route management url
		await next();
	}else{     //route mock data url
		let mapping = mappings[url];
		let responseBody;
		if(mapping.type == 'tmpl') {
			var tmpl = tmplSet[mapping.dataKey];
			logger.debug("Find data template for url [ %s ] : ", url, tmpl);
			var data = gen.generate(tmpl, mapping.count);
			responseBody = {code: 200, data: data};
		}else{
			responseBody = {code: 200, data: dataSet[mapping.dataKey][mapping.state]};
		}
		logger.debug("Response data for url[ %s ] : ", url, responseBody);
		ctx.response.body = responseBody;
	}
});

// add router middleware:
app.use(router.routes());

// add url-route:
router.get('/__man__/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = '<h1>Hello, ${name}!</h1>';
});
router.get('/__man__', async (ctx, next) => {
	console.log(ctx.request);
	console.log(ctx.response);
    ctx.response.body = '<h1>Index</h1>';
});

// startup server
app.listen(config.port);
logger.info("Wukong Mock Server started at port %d ...", config.port);
