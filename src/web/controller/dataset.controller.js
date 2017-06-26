const dataset       = require('../../dataset/dataset');
const Base64        = require('js-base64').Base64;

const logger        = require('../../log/log');


let dataMgr = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.render('data/data.html', {});
};

let loadDatas = async (ctx, next) => {
	let result = [];

    let allData = dataset.getDataSet();

	for(let dataKey in allData) {
		let dataDef = allData[dataKey];
        var data = {};
        data['dataKey'] = dataKey;
        data['dataDef'] = dataDef;
		result.push(data);
	}
	ctx.response.set({
		"Content-Type": "application/json",
		'Cache-Control': 'no-cache'
	});
	ctx.response.body = result;
};

let loadData = async (ctx, next) => {
    logger.debug("GET /__man__/data/:dataKey entry");

    let allData = dataset.getDataSet();

	let dataKey = ctx.params.dataKey;
	dataKey = Base64.decode(dataKey);

    logger.debug("param dataKey = " + dataKey);

	ctx.response.set({
		"Content-Type": "application/json",
		'Cache-Control': 'no-cache'
	});
    logger.debug("return " + allData[dataKey]);
	ctx.response.body = allData[dataKey];
};

module.exports = {
    'GET /__man__/datamgr' : dataMgr,
    'GET /__man__/dataset' : loadDatas,
    'GET /__man__/data/:dataKey' : loadData
};
