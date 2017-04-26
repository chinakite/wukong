const logger        = require('../log/log');

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
    }else if(policy == "url") {
        data = ctx.request.url;
    }else if(policy == "param") {
        if(ctx.request.method.toLowerCase() == "post") {
            data = ctx.body[reqRuleDesc.attr];
        }else{
            data = ctx.request.query[reqRuleDesc.attr];
        }
    }

    if(count == 1) {
        return data;
    }else{
        let result = [];
        for(let i=0; i<count; i++) {
            result.push(data);
        }
        return result;
    }
}

module.exports.__proto__ = {
	"generate" : generate
}
