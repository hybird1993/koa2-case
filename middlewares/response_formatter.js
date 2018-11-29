const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');

/**
 * 在app.use(router)之前调用
 */

const ARR = ['/api/user/login'];  // 不需要登录就能调用的接口

const response_formatter = (ctx) => {
    const lang = ctx.request.header.lang || 'zh';
    const msg = lang === 'zh' ? '请求成功' : 'Success';
    if (ctx.body) {
        ctx.body = {
            code: 0,
            msg: msg,
            data: ctx.body
        }
    } else {
        ctx.body = {
            code: 0,
            msg: msg
        }
    }
};

const url_filter = (pattern) => {
    return async (ctx, next) => {
        const reg = new RegExp(pattern);
        try {
            if (reg.test(ctx.originalUrl) && ARR.indexOf(ctx.url) < 0 && !ctx.session.id) {
                const lang = ctx.request.header.lang || 'zh';
                const error = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_SESSION_INVALID);
                const msg = lang === 'zh' ? error.desc : error.msg;
                ctx.status = 401;
                ctx.body = {
                    code: error.code,
                    msg: msg
                };
                return;
            }
            // 先去执行路由
            await next();
        } catch (error) {
            // 如果异常类型是API异常并且通过正则验证的url，将错误信息添加到响应体中返回。
            if (error instanceof ApiError && reg.test(ctx.originalUrl)) {
                const lang = ctx.request.header.lang || 'zh';
                const msg = lang === 'zh' ? error.desc : error.msg;
                ctx.status = 200;
                ctx.body = {
                    code: error.code,
                    msg: msg
                }
            }
            //继续抛，让外层中间件处理日志
            throw error;
        }

        // 通过正则的url进行格式化处理
        if (reg.test(ctx.originalUrl)) {
            response_formatter(ctx);
        }
    }
};

module.exports = url_filter;