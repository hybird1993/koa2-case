const config = require('./index');

// session存储配置
const sessionMysqlConfig= {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
};

// 存放sessionId的cookie配置
const cookie = {
    //  path: '', // 写cookie所在的路径
    //  domain: '', // 写cookie所在的域名
    maxAge: 1000 * 60 * 10,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
};

module.exports = {
    sessionMysqlConfig, cookie
}