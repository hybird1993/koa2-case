const dbUtils = require('./../utils/db-util');
const Common = require('./common')

const user = {
    async getUsersList(params) {
        let result = await Common.getList('user_info', params);
        return result;
    },
    async login(name, password) {
        let result = await dbUtils.query("SELECT * FROM ?? WHERE name = ? AND password = ?", ['user_info', name, password]);
        return result;
    },
    async getUserByName(name) {
        let result = await dbUtils.query("SELECT * FROM ?? WHERE name = ?", ['user_info', name]);
        return result;
    },
    async register(params) {
        let result = await dbUtils.insert('user_info', params);
        return result;
    },
    async findUserByName(name) {
        let result = await dbUtils.findDataByKey('user_info', name, 'name');
        return result;
    },
    async getTotalUsersNum() {
        let result =await Common.getTotalNum('user_info');
        return result;
    },
}

module.exports = user;