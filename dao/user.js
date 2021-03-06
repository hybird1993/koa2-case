const dbUtils = require('./../utils/db-util');
const CommonUtils = require('./common');

const user = {
    async getUsersList(params) {
        const result = await CommonUtils.getList('user_info', params);
        return result;
    },
    async login(name, password) {
        const result = await dbUtils.query("SELECT * FROM ?? WHERE name = ? AND password = ?", ['user_info', name, password]);
        return result;
    },
    async getUserByName(name) {
        const result = await dbUtils.query("SELECT * FROM ?? WHERE name = ?", ['user_info', name]);
        return result;
    },
    async getUserByKey(value, key = 'id') {
        const result = await CommonUtils.findDataByKey('user_info', value, key);
        return result;
    },
    async register(params) {
        const result = await CommonUtils.insert('user_info', params);
        return result;
    },
    async findUserByName(name) {
        const result = await CommonUtils.findDataByKey('user_info', name, 'name');
        return result;
    },
    async getTotalUsersNum() {
        const result = await dbUtils.baseQuery(`SELECT COUNT(*) FROM user_info WHERE name != "admin"`);
        return result[0]['COUNT(*)'];
    },
    async deleteUsers(ids) {
        const result = await CommonUtils.deleteItems('user_info', 'id', ids);
        return result;
    },
    async modifyUser(params, queryStr) {
        const result = await CommonUtils.update('user_info', params, queryStr);
        return result;
    },
    async modifyPassword(name, password) {
        const result = await dbUtils.query("UPDATE ?? SET password = ? WHERE name = ?", ['user_info', password, name]);
        return result;
    },
    async resetPassword(id, password) {
        const result = await dbUtils.query("UPDATE ?? SET password = ? WHERE id = ?", ['user_info', password, id]);
        return result;
    }
};

module.exports = user;