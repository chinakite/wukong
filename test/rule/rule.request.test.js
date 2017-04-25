const expect  = require('chai').expect;
const reqRuleParser = require("../../src/rule/rule.request");

describe('Test rule.request.js', function() {
    it('Test policy [cookie]', function() {
        var rule = "req|cookie|pin";
        rule = rule.split("|");

        var expected = {
            _policy : "cookie",
            _attr : "pin"
        }

        var ruleDesc = reqRuleParser.parseRule(rule);
        console.log(JSON.stringify(ruleDesc));
        expect(ruleDesc).to.be.deep.equal(expected);
    });
});
