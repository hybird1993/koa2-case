const userDao = require('../dao/user');
const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');

const user = {
    async getUsersList(ctx) {
        const params = ctx.request.body;
        if(!params.pageSize || !params.pageNum) {
            throw new ApiError(ApiErrorNames.PARAMETER_ERROR)
        }
        const num = await userDao.getTotalUsersNum();
        console.log(num)
        let usersList = await userDao.getUsersList(params);
        console.log(usersList)
        const _usersList = usersList.map(item => {
            const {password , ..._item} = item;
            return _item;
        });
        console.log(_usersList)
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
                const data = {
                    name: user.name,
                    nickname: user.nickname,
                    icon: user.icon,
                    email: user.email};
                console.log(data, '--->data')
                ctx.body = data
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
};

module.exports = user;