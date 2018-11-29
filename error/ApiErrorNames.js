const ApiErrorNames = {};

ApiErrorNames.UNKNOWN_ERROR = 'UNKNOWN_ERROR';
ApiErrorNames.SYSTEM_ERROR = 'SYSTEM_ERROR';
ApiErrorNames.PARAMETER_ERROR = 'PARAMETER_ERROR';
ApiErrorNames.USER_SESSION_INVALID = 'USER_SESSION_INVALID';
ApiErrorNames.USER_NAME_OR_PASSWORD_ERROR = 'USER_NAME_OR_PASSWORD_ERROR';
ApiErrorNames.USER_NAME_EXIST = 'USER_NAME_EXIST';

const error_map = new Map();

/**
 * 逻辑文案管理
 * start with 1：通用
 * start with 2: 用户
 */
error_map.set(ApiErrorNames.UNKNOWN_ERROR, {code: -1, msg: 'Unknown error!', desc: '未知错误'});
error_map.set(ApiErrorNames.SYSTEM_ERROR, {code: 10001, msg: 'System error!', desc: '系统错误!'});
error_map.set(ApiErrorNames.PARAMETER_ERROR, {code: 10002, msg: 'Parameter error!', desc: '参数错误!'});
error_map.set(ApiErrorNames.USER_SESSION_INVALID, {code: 20001, msg: 'Login status is invalid. Please login again!', desc: '登录状态失效，请重新登录!'});
error_map.set(ApiErrorNames.USER_NAME_OR_PASSWORD_ERROR, {code: 20002, msg: 'Username or password is error!', desc: '用户名或密码错误'});
error_map.set(ApiErrorNames.USER_NAME_EXIST, {code: 20003, msg: 'Username is exist!', desc: '用户名已存在'});

ApiErrorNames.getErrorInfo = (error_name) => {
  return error_map.get(error_name) || error_name.get(ApiErrorNames.UNKNOWN_ERROR);
}

module.exports = ApiErrorNames;