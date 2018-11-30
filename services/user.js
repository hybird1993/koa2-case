const userDao = require('../dao/user');
const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const Types = require('../utils/type');

const user = {
    /**
     * 获取用户列表
     * @param ctx
     * @returns {Promise<void>}
     */
    async getUsersList(ctx) {
        const params = ctx.request.body;
        if (!params.pageSize || !params.pageNum) {
            throw new ApiError(ApiErrorNames.PARAMETER_ERROR)
        }
        const num = await userDao.getTotalUsersNum();
        let usersList = await userDao.getUsersList(params);
        const _usersList = usersList.map(item => {
            const {password, ..._item} = item;
            return _item;
        });
        ctx.body = {
            data: _usersList,
            totalCount: num,
            totalPage: Math.ceil(num / params.pageSize),
            pageSize: params.pageSize,
            pageNum: params.pageNum
        };
    },

    /**
     * 用户登录
     * @param  {object} ctx 上下文对象
     */
    async login(ctx) {
        const params = ctx.request.body;
        if (!params.name || !params.password) {
            throw new ApiError(ApiErrorNames.USER_NAME_OR_PASSWORD_ERROR);
        } else {
            const result = await userDao.getUserByName(params.name);
            if (result.length === 0 || params.password !== result[0].password) {
                throw new ApiError(ApiErrorNames.USER_NAME_OR_PASSWORD_ERROR);
            } else {
                const user = result[0];
                ctx.session = user;
                const {password, ..._data} = user;
                ctx.body = _data;
            }
        }
    },
    /**
     * 用户注册
     * @param ctx
     * @returns {Promise<void>}
     */
    async register(ctx) {
        const params = {name, password, nickname, email} = ctx.request.body;
        if (!name || !password) {
            throw new ApiError(ApiErrorNames.PARAMETER_ERROR);
        }
        const user = await userDao.findUserByName(name);
        if (user.length > 0) {
            throw new ApiError(ApiErrorNames.USER_NAME_EXIST);
        }
        params.create_time = new Date();
        const result = await userDao.register(params);
        if (result.length === 0) {
            throw new ApiError(ApiErrorNames.SYSTEM_ERROR);
        } else {
            ctx.body = true;
        }
    },

    /**
     * 通过用户名查找用户
     * @param name
     * @returns {Promise<*>}
     */
    async findUserByName(name) {
        const result = await userDao.findUserByName(name);
        return result;
    },

    /**
     * 检验用户名是否存在
     * @param ctx
     * @returns {Promise<void>}
     */
    async checkUserName(ctx) {
        const name = ctx.params.username;
        const user = await userDao.findUserByName(name);
        if (user.length === 0) {
            ctx.body = true;
        } else {
            throw new ApiError(ApiErrorNames.USER_NAME_EXIST);
        }
    },

    /**
     *  获取用户信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async getUserInfo(ctx) {
        const {password, ..._data} = ctx.session;
        ctx.body = _data;
    },

    /**
     * 删除用户
     * @param ctx
     * @returns {Promise<void>}
     */
    async deleteUsers(ctx) {
        const ids = ctx.request.body.ids;
        if (!Types.isArray(ids) && !Types.isString(ids) && !Types.isNumber(ids)) {
            throw new ApiError(ApiErrorNames.PARAMETER_ERROR);
        }
        const bol = Types.isArray(ids) ? ids === 1 :
            Types.isString(ids) ? ids === '1' :
                Types.isArray(ids) ? (ids.indexOf('1') > -1 || ids.indexOf(1) > -1) : false;
        if (bol) {
            throw new ApiError(ApiErrorNames.ADMIN_NOT_DELETE);
        }
        const result = await userDao.deleteUsers(ids);
        const data = {
            success: result.affectedRows,
            total: Types.isArray(ids) ? ids.length : 1
        };
        ctx.body = data;
    },

    async modifyPassword(ctx) {
        const oldPwd = ctx.request.body.oldPwd;
        const newPwd = ctx.request.body.newPwd;
        const name = ctx.session.name;
        if (!oldPwd || !newPwd) {
            throw new ApiError(ApiErrorNames.USER_NAME_OR_PASSWORD_ERROR);
        } else {
            const result = await userDao.getUserByName(name);
            if (result.length === 0 || oldPwd !== result[0].password) {
                throw new ApiError(ApiErrorNames.USER_NAME_OR_PASSWORD_ERROR);
            } else {
                const result = await userDao.modifyPassword(name, newPwd);
                if (result.affectedRows === 1) {
                    ctx.body = true;
                } else {
                    throw new ApiError(ApiErrorNames.UNKNOWN_ERROR);
                }

            }
        }
    }
};

module.exports = user;