function generate(reqRuleDesc, count, config, ctx) {
    if(!count) count = 1;

    let policy = reqRuleDesc.policy;
    let data;
    if(policy == "cookie") {
        data = ctx.cookies.get(reqRuleDesc.attr);
    }else if(policy == "header") {
        data = ctx.request.headers.get(reqRuleDesc.attr);
    }else if(policy == "body") {
        data = ctx.body;
    }
}

module.exports.__proto__ = {
	"generate" : generate
}
