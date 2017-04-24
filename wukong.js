const Koa           = require('koa');
const router        = require('koa-router')();
const bodyParser    = require('koa-bodyparser');
const favicon       = require('koa-favicon');
const nunjucks      = require('nunjucks');

const staticFile    = require('./src/static.file');
const templating    = require('./src/html.template');

const config        = require('./wukong.config');
const mapping       = require('./src/mapping/mapping');
const dataset       = require('./src/dataset/dataset');
const template      = require('./src/template/template');
const gen           = require('./src/generator/generator');

//TODO extends Default Options
let   logOption     = config.log;
if(!logOption) {
	logOption = {level: 'info'}
}
const logger        = require('tracer').colorConsole(config.log);

const app           = new Koa();

const isProduction  = process.env.NODE_ENV === 'production';

let mappings = {};		//store mappings
let dataSet  = {};		//store defined datas

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
	let tmplCount = template.loadTemplates(config);
	logger.info("%d templates are loaded. ", tmplCount);
}

startup();

app.use(favicon(process.cwd() + '/favicon.ico'));

app.use(staticFile('/static/', __dirname + '/static'));

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
		let data;

		let tmplSet = template.getTmplSet();

		if(mapping.type == 'tmpl') {
			var tmpl = tmplSet[mapping.dataKey];
			logger.debug("Find data template for url [ %s ] : ", url, tmpl);
			try {
				data = await gen.generate(tmpl, mapping.count, config);
			}catch(err) {
				throw err;
			}
		}else{
			data = dataSet[mapping.dataKey][mapping.state];
		}
		if(mapping.delay && mapping.delay > 0) {
			await timer(mapping.delay);
		}
		if(mapping.wrapper && mapping.wrapper[mapping.state]) {
			let wrapper = mapping.wrapper[mapping.state];
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

// add url-route:
router.get('/__man__', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});
router.get('/__man__/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = '<h1>Hello, ${name}!</h1>';
});
router.get('/__man__/mappingmgr', async (ctx, next) => {
    ctx.render('mapping/mappings.html', {});
});
router.get('/__man__/mappings', async (ctx, next) => {

});

// startup server
app.listen(config.port);
logger.info("Wukong Mock Server started at port %d ...", config.port);
