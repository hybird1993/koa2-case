const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
//log工具
const logUtil = require('./utils/log_util');
const index = require('./routes/index');

const router = require('koa-router')();
const api = require('./routes/api');

const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const {sessionMysqlConfig, cookie } = require('./config/session_config');
const response_formatter = require('./middlewares/response_formatter');
// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
// app.use(logger());

// logger
app.use(async (ctx, next) => {
    //响应开始时间
    const start = new Date();
    //响应间隔时间
    var ms;
    try {
        //开始进入到下一个中间件
        await next();

        ms = new Date() - start;
        //记录响应日志
        logUtil.logResponse(ctx, ms);

    } catch (error) {

        ms = new Date() - start;
        //记录异常日志
        logUtil.logError(ctx, error, ms);
    }
});

app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}));


// 配置session中间件
app.use(session({
    key: 'USER_SID',   //  //cookie key (default is koa:sess)
    store: new MysqlStore(sessionMysqlConfig),
    cookie: cookie
}));


// 配置控制台日志中间件
app.use(logger());

// logger
app.use( response_formatter(`^/api`));

// routes
router.use('/', index.routes(), index.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
app.use(router.routes(), router.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app;
