const logger        = require('../log/log');

function parseRule(ruleItemStrs) {
	return new EmptyRuleDesc();
}

class EmptyRuleDesc {
}

module.exports = {
	"parseRule" : parseRule
}
