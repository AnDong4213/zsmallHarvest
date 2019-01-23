const http = require('http');

http.createServer(function(req, res) {
	console.log('req come', req.url);
	
	if (req.url.indexOf('?') > -1) {
		let para = req.url.substring(req.url.indexOf('?') + 1), paraObj = {};
		para.split('&').forEach(item => {
			let arrItem = item.split('='), Obj = {};
			Obj[arrItem[0]] = arrItem[1];
			paraObj = Object.assign(paraObj, Obj)
		});
		console.log(paraObj)
	}
	
	
	/* res.writeHead(200, {
		// 'Access-Control-Allow-Origin': 'http://127.0.0.1:8888'
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'X-Test-Cors',
		'Access-Control-Allow-Methods': 'POST, PUT, Delete',
		'Content-Type': 'text/plain'
	}); */
	res.end('1234');
}).listen(8887)

console.log('监听8887端口...');

