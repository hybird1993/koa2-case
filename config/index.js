const dev_env = require('./dev');
const prod_env = require('./prod');
const test_env = require('./test');


//根据不同的env，输出不同的配置对象，默认输出development的配置对象
module.exports = {
    dev: dev_env,
    prod: prod_env,
    test: test_env
}[getArg('env') || 'prod']

function getArg(item) {
    const args = process.argv;
    const reg = new RegExp(`^--${item}=(.*)$`);
    let result = null;
    args.forEach(item => {
        if(item.match(reg)) {
            result = item.match(reg)[1];
        }
    });
    return result;
}