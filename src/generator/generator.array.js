const template      = require('../template/template');

const objectGen = require('./generator.object');

const logger        = require('../log/log');

function generate(arrayRuleDesc, count, config) {
	return new Promise(async function(resolve, reject){
		try {
			let refDesc = arrayRuleDesc.refDesc;
	        let result = [];
			if(refDesc) {
				let tmplSet = template.getTmplSet();
				let refTmpl = tmplSet[refDesc];

				if(count == 1) {
					result = await objectGen.generate(refTmpl.desc, arrayRuleDesc.count, config);
				}else{
					for(let i=0; i<count; i++) {
						let arr = await objectGen.generate(refTmpl.desc, arrayRuleDesc.count, config);
						result.push(arr);
					}
				}
	        }else{
	            for(let i=0; i<arrayRuleDesc.length; i++) {
	                let objRuleDesc = arrayRuleDesc[i];
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
