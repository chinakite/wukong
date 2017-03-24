function regexFullMatch(str, regex) {
	regex.lastIndex = 0;
	let result = [];
	let t;
	while(t = regex.exec(str)) {
		if(t) {
			for(let i=1; i<t.length; i++) {
				result.push(t[i]);
			}
		}
	}
	return result;
}

function regexTest(str, regex) {
	regex.lastIndex = 0;
	return regex.test(str);
}

module.exports = {
	'regexFullMatch' : regexFullMatch,
	'regexTest' : regexTest
}
