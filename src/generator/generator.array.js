let objectGen = require('./generator.object');

function generate(arrayRuleDesc, count, config) {
	return new Promise(async function(resolve, reject){
        let refDesc = arrayRuleDesc.refDesc;
        let result = [];
		if(refDesc) {

        }else{
            for(let i=0; i<arrayRuleDesc.length; i++) {
                let objRuleDesc = arrayRuleDesc[i];
                let obj = await objectGen.generate(objRuleDesc, 1, config);
                result.push(obj);
            }
        }
        resolve(result);
    });
}

module.exports = {
	"generate" : generate
}
