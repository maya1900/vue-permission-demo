const Koa = require('koa')
const app = new Koa()

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    // 前台发送请求头多了个x-token字段，在这里要加上
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , x-token');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
})

const getRouter = require('./module/get')
app.use(getRouter.routes())

app.listen(3333, () => {
    console.log("server is running")
})