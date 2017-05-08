const request = require('request');
const logger  = require('../../log/log');

function load(url, mappings, tmplSet) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if(error) {
                reject(error);
            }else{
                let json = JSON.parse(body);
                let paths = json['paths'];
                for(let api in paths) {
                    for(let method in api) {
                        let schema = api[method]['responses']['200']['schema'];
                        if(schema) {
                            if(schema.type == 'boolean') {
                                
                            }
                        }else{

                        }
                    }
                }
            }
        });
	});
}

module.exports = {
    "load" : load
}
