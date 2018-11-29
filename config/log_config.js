var path = require('path');

//错误日志输出完整路径
var errorLogPath = path.resolve(__dirname, "../logs/error/error");

//响应日志输出完整路径
var responseLogPath = path.resolve(__dirname, "../logs/response/response");

module.exports = {
    appenders:
        {
            //错误日志
            errorLogger: {
                "category":"",             //logger名称
                "type": "dateFile",                   //日志类型
                "filename": errorLogPath,             //日志输出位置
                "alwaysIncludePattern":true,          //是否总是有后缀名
                "pattern": "-yyyy-MM-dd-hh.log"       //后缀，每小时创建一个新的日志文件
            },
            //响应日志
            resLogger: {
                "type": "dateFile",
                "filename": responseLogPath,
                "alwaysIncludePattern":true,
                "pattern": "-yyyy-MM-dd-hh.log"
            }
      },
    categories: {
        cheese: { appenders: ['errorLogger'], level: 'error' },
        another: { appenders: ['resLogger'], level: 'all' },
        default: { appenders: ['errorLogger', 'resLogger'], level: 'trace' }
    }
};