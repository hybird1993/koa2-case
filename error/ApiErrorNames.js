const ApiErrorNames = {};

ApiErrorNames.UNKNOWN_ERROR = 'UNKNOWN_ERROR';
ApiErrorNames.SYSTEM_ERROR = 'SYSTEM_ERROR';
ApiErrorNames.PARAMETER_ERROR = 'PARAMETER_ERROR';
ApiErrorNames.USER_SESSION_INVALID = 'USER_SESSION_INVALID';
ApiErrorNames.USER_NAME_OR_PASSWORD_ERROR = 'USER_NAME_OR_PASSWORD_ERROR';
ApiErrorNames.USER_NAME_EXIST = 'USER_NAME_EXIST';
ApiErrorNames.ADMIN_CAN_NOT_DELETE = 'ADMIN_CAN_NOT_DELETE';
ApiErrorNames.OLD_PASSWORD_ERROR = 'OLD_PASSWORD_ERROR';
ApiErrorNames.INSUFFICIENT_PRIVILEGE = 'INSUFFICIENT_PRIVILEGE';
ApiErrorNames.BAD_REQUEST = 'BAD_REQUEST';

const error_map = new Map();

/**
 * 逻辑文案管理
 * start with 1：通用
 * start with 2: 用户
 */
error_map.set(ApiErrorNames.UNKNOWN_ERROR, {code: -1, msg: 'Unknown error!', desc: '未知错误'});
error_map.set(ApiErrorNames.SYSTEM_ERROR, {code: 10001, msg: 'System error!', desc: '系统错误!'});
error_map.set(ApiErrorNames.PARAMETER_ERROR, {code: 10002, msg: 'Parameter error!', desc: '参数错误!'});
error_map.set(ApiErrorNames.BAD_REQUEST, {code: 10003, msg: 'Bad request!', desc: '错误的请求'});
error_map.set(ApiErrorNames.USER_SESSION_INVALID, {code: 20001, msg: 'Login status is invalid. Please login again!', desc: '登录状态失效，请重新登录!'});
error_map.set(ApiErrorNames.USER_NAME_OR_PASSWORD_ERROR, {code: 20002, msg: 'Username or password is error!', desc: '用户名或密码错误'});
error_map.set(ApiErrorNames.USER_NAME_EXIST, {code: 20003, msg: 'Username is exist!', desc: '用户名已存在'});
error_map.set(ApiErrorNames.ADMIN_CAN_NOT_DELETE, {code: 20004, msg: 'Can not delete admin user!', desc: 'admin用户不可删除'});
error_map.set(ApiErrorNames.OLD_PASSWORD_ERROR, {code: 20005, msg: 'Old password is wrong!', desc: '原密码有误'});
error_map.set(ApiErrorNames.INSUFFICIENT_PRIVILEGE, {code: 20006, msg: 'Insufficient privilege!', desc: '权限不够'});

ApiErrorNames.getErrorInfo = (error_name) => {
  return error_map.get(error_name) || error_name.get(ApiErrorNames.UNKNOWN_ERROR);
}

module.exports = ApiErrorNames;