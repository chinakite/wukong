const objectGen = require('./generator.object');

//TODO extends Default Options
let   logOption    = {level: 'debug'};
const logger        = require('tracer').colorConsole(logOption);

logger.debug("***************************");
logger.debug(objectGen);
logger.debug("***************************");

function generate(arrayRuleDesc, count, config) {
	return new Promise(async function(resolve, reject){
		try {
			let refDesc = arrayRuleDesc.refDesc;
	        let result = [];
			if(refDesc) {

	        }else{
	            for(let i=0; i<arrayRuleDesc.length; i++) {
	                let objRuleDesc = arrayRuleDesc[i];
					logger.debug(objectGen);
	                let obj = await objectGen.generate(objRuleDesc, 1, config);
	                result.push(obj);
	            }
	        }
	        resolve(result);
		}catch(err) {
			logger.error(err);
			reject();
		}

    });
}

module.exports = {
	"generate" : generate
}
