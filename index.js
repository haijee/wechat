const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
const app = new Koa();

const signature = require('./utils')
const test = require('./test')

app.use(cors());
app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods());

router.get('/test', async (ctx, next) =>{
    console.log(ctx.request.body);
    ctx.type = "html";
    ctx.body = await test()
})
router.post('/sign', async (ctx,next)=>{
    const url = ctx.header.url
    console.log('url->',url,);
    ctx.body = await signature(url)
});

app.listen(3000,()=>{
    console.log('测试网址: http://127.0.0.1:3000/test')
    console.log('获取签名: http://127.0.0.1:3000/sign')
});
