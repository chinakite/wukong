const Koa           = require('koa');
const router        = require('koa-router')();
const bodyParser    = require('koa-bodyparser');
const favicon       = require('koa-favicon');
const nunjucks      = require('nunjucks');

const staticFile    = require('./src/static.file');
const templating    = require('./src/html.template');
const controllers   = require('./src/web/controllers');

const config        = require('./wukong.config');
const mapping       = require('./src/mapping/mapping');
const dataset       = require('./src/dataset/dataset');
const template      = require('./src/template/template');
const gen           = require('./src/generator/generator');

const swaggerLoader = require('./src/intergration/swagger/api.swagger.loader');

const logger        = require('./src/log/log');

const app           = new Koa();

const isProduction  = process.env.NODE_ENV === 'production';

let dataSet  = {};		//store defined datas

function startup() {
	//1. Load mappings.
	logger.info("Loading mappings ... ");
	let mappingCount = mapping.loadMappings(config);
	logger.info("%d mappings are loaded. ", mappingCount);

	//2. Load defined data set
	dataset.loadDatas(config);

	//3. Load data templates
	logger.info("Loading templates ... ");
	let tmplCount = template.loadTemplates(config);
	logger.info("%d templates are loaded. ", tmplCount);
	let tmplSet = template.getTmplSet();

	if(config.swagger && config.swagger.enabled) {
		let swaggerApis = config.swagger.apis;
		if(swaggerApis) {
			for(let i=0; i<swaggerApis.length; i++) {
				let apiUrl = swaggerApis[i];
				swaggerLoader.load(apiUrl, mapping.getMappings());
			}
		}
	}
}

startup();

app.use(favicon(process.cwd() + '/favicon.ico'));

app.use(staticFile('/static/', __dirname + '/static'));

//route /man to router
app.use(async (ctx, next) => {
	let url = ctx.request.path;
    logger.debug("Request url : [ %s ]", url);

	let reqMethod = ctx.request.method;

    //some restful request is parsed endsWith slash. If it's not root context,
    //drop it!
	if(url && url.length > 1 && url.endsWith('/')) {
		url = url.substring(0, url.length-1);
	}

	if(url == '/' || url.startsWith('/__man__')) {   //route management url
		await next();
	}else{     //route mock data url
		let dataSet  = dataset.getDataSet();
		let mappings = mapping.getMappings();

		let mappingDef = mappings[url][reqMethod];
		let responseBody;
		let data;

		let tmplSet = template.getTmplSet();

		if(mappingDef.type == 'tmpl') {
			var tmpl = tmplSet[mappingDef.dataKey];
			logger.debug("Find data template for url [ %s ] : ", url, tmpl);
			try {
				data = await gen.generate(tmpl, mappingDef.count, config, ctx);
			}catch(err) {
				throw err;
			}
		}else if(mappingDef.type == 'swagger'){
			let swaggerTmplSet = swaggerLoader.getSwaggerTmplSet();
			var tmpl = swaggerTmplSet[url + "_" + reqMethod.toUpperCase()];
			try {
				data = await gen.generate(tmpl, mappingDef.count, config, ctx);
			}catch(err) {
				throw err;
			}
		}else{
			data = dataSet[mappingDef.dataKey][mappingDef.state];
		}
		if(mappingDef.delay && mappingDef.delay > 0) {
			await timer(mappingDef.delay);
		}
		if(mappingDef.wrapper && mappingDef.wrapper[mappingDef.state]) {
			let wrapper = mappingDef.wrapper[mappingDef.state];
			let wrapperedObj = {};
			for(let prop in wrapper) {
				if(wrapper[prop] === "@respData") {
					wrapperedObj[prop] = data;
				}else{
					wrapperedObj[prop] = wrapper[prop];
				}
			}
			responseBody = wrapperedObj;
		}else{
			responseBody = data;
		}
		logger.debug("Response data for url[ %s ] : ", url, responseBody);
		ctx.response.body = responseBody;
	}
});

function timer(delay) {
	return new Promise((resolve, reject)=>{
		setTimeout(function(){
			resolve();
		}, delay);
	});
}

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(bodyParser());

// add router middleware:
app.use(router.routes());

// load controllers
app.use(controllers());

// add url-route:
router.get('/__man__', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});
router.get('/__man__/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = '<h1>Hello, ${name}!</h1>';
});

// startup server
app.listen(config.port);
logger.info("Wukong Mock Server started at port %d ...", config.port);
