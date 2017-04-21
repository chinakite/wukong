const objectGen = require('./generator.object');

//TODO extends Default Options
let   logOption    = {level: 'debug'};
const logger        = require('tracer').colorConsole(logOption);

function generate(arrayRuleDesc, count, config) {
	return new Promise(async function(resolve, reject){
		try {
			let refDesc = arrayRuleDesc.refDesc;
			logger.debug("-------- Array ----------");
			logger.debug(arrayRuleDesc);
			logger.debug("-------- end ----------");
	        let result = [];
			if(refDesc) {

	        }else{
	            for(let i=0; i<arrayRuleDesc.length; i++) {
	                let objRuleDesc = arrayRuleDesc[i];
					logger.debug("-------- Array Object ----------");
					logger.debug(objRuleDesc);
					logger.debug("-------- end ----------");
	                let obj = await objectGen.generate(objRuleDesc.desc, 1, config);
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

module.exports.__proto__ = {
	"generate" : generate
}
