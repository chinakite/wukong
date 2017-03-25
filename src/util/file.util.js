const fs     = require("fs");
const random = require("random-js")();

function randline(filepath) {
	fs.stat(filepath, function(err, stats){
		let bufferSize = 1024;
		if(err) {
			throw err;
		}
		let chunkRange = stats.size - bufferSize;
		let options = {};
		if(chunkRange > 0) {
            options.start = random.integer(0, chunkRange);
            options.end = options.start + bufferSize;
		}
        let stream = fs.createReadStream(filepath, options);
        stream.on('data', function(d){
            console.log(d.toString());
            let arr = d.toString().split(/\r?\n/);
            console.log(arr);
            arr.splice(0, 1);
            arr.splice(arr.length-1, 1);
            stream.destroy();
            return random.pick(arr);
        });
	});
}

module.exports = {
    "randline" : randline
}
