const defaultLogOption = {
    level: "info"
}

const config        = require('../../wukong.config');

let configLogOption     = config.log;
let logOption;
if(!configLogOption) {
	logOption = defaultLogOption;
}else{
    logOption = Object.assign({}, defaultLogOption, logOption);
}
const logger        = require('tracer').colorConsole(logOption);

module.exports = logger;
