const fs     = require("fs");
const random = require("random-js")();

var randline = async function(filepath, excludeEmpty=true, bufferSize=1024) {
	var stats = await fileStat(filepath);
	return readRandomLine(stats, filepath, excludeEmpty, bufferSize);
}

var fileStat = function(filepath) {
	return new Promise(function (resolve, reject) {
		fs.stat(filepath, function(err, stats){
			if(err) {
				reject(err);
			}
			resolve(stats);
		});
	});
}

var readRandomLine = function(stats, filepath, excludeEmpty, bufferSize) {
	return new Promise(function (resolve, reject) {
		let chunkRange = stats.size - bufferSize;
		let options = {};
		if(chunkRange > 0) {
			options.start = random.integer(0, chunkRange);
			options.end = options.start + bufferSize;
		}

		let stream = fs.createReadStream(filepath, options);
	    stream.on('data', function(d){
	        let arr = d.toString().split(/\r?\n/);
			stream.destroy();
			if(chunkRange > 0) {
				if(options.start > 0) {
					//drop head, because it maybe not a integrity line
		            arr.splice(0, 1);
				}
				if(options.end < stats.size) {
					//drop tail, because it maybe not a integrity line
					arr.splice(arr.length-1, 1);
				}
			}
			if(excludeEmpty) {
				arr = arr.filter(function(e){return !!e;});
			}
			resolve(random.pick(arr));
	    });
	});
}

module.exports = {
    "randline" : randline
}
