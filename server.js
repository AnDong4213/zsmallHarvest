const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {
	console.log('req come', req.url);
	
	const html = fs.readFileSync('./server.html', 'utf8');
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	res.end(html);
}).listen(8888)

console.log('监听8888端口...');

