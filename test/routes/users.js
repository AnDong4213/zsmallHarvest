const router = require('koa-router')()
const formidable = require('formidable');

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  // console.log(ctx.query)
  ctx.body = 'this is a users/bar response'
})

/* router.post('/form', async (ctx, next) => {
	console.log(ctx.request.body['a']);
	console.log(ctx.request.body);
	
	// 设置响应头：ctx.set('Content-Type', 'application/zip')
    // 添加请求头：  ctx.append('userName','dd');
		
	// console.log(ctx.get('X-Test')) //  one
	ctx.set('Access-Control-Expose-Headers', 'Date, Connection');
	// ctx.set('Access-Control-Allow-Credentials', true);
	ctx.set('Access-Control-Allow-Methods', 'POST, PUT, Delete');
	ctx.set('Access-Control-Max-Age', '10000');
	
	ctx.body = {
		result: true,
	};  // Content-Type: application/json; charset=utf-8
	
	// ctx.body = 'hh哈';  // Content-Type: text/plain; charset=utf-8
}) */

router.get('/form', async (ctx, next) => {
	console.log(ctx.query.a);
	console.log(ctx.query);
	
	ctx.body = {
		result: true,
	};
})

router.post('/form', async (ctx, next) => {
	
	let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = './public/images/petimgs';   
    form.keepExtensions = true;
    form.maxFieldsSize = 200 * 1024 * 1024 ;
	
	let fields = await new Promise((resolve, reject) => {
      form.parse(ctx.req, function (err, fields, files) {
        if (err) {
            console.log(err);
            resolve('0');
            return;
        };
		console.log(files.myFile.path);
		console.log(fields);
        resolve(files);
      })
    });
	
	ctx.body = fields;
	
})










module.exports = router
