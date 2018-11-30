const dbUtils = require('./../utils/db-util');
const type =  require('./../utils/type');

const common = {
    async getTotalNum(table_name) {
        let result = await dbUtils.query("SELECT COUNT(*) FROM ??", [table_name]);
        return result[0]['COUNT(*)'];
    },

    async getList(table_name, params) {
        const sortWay = params.sortWay;
        const sortItem = params.sortItem;
        const pageSize = params.pageSize;
        const pageNum = params.pageNum;
        const startIndex = (pageNum - 1) * pageSize;
        let result;
        if(sortWay && sortItem) {
            result = await dbUtils.query("SELECT * FROM ?? ORDER BY ? ? LIMIT ?, ?", [table_name, sortItem, sortWay, startIndex, pageSize]);
        } else {
            result = await dbUtils.query("SELECT * FROM ?? LIMIT ?, ?", [table_name, startIndex, pageSize]);
        }
        return result;
    },

    async deleteItems(table_name, key, value) {
        let result;
        if(type.isArray(value)) {
            const values = value.join(',');
            result = await dbUtils.baseQuery(`DELETE FROM ${table_name} WHERE ${key} in (${values})`);
        }else {
            result = await dbUtils.baseQuery(`DELETE FROM ${table_name} WHERE ${key} = ${value}`);
        }
        return result;
    },

    async findDataByKey(table_name, value, key = 'id') {
        let result;
        result = await dbUtils.query(`SELECT * FROM ?? WHERE ${key} = ?`, [table_name, value]);
        return result;
    },

    async insert(table_name, params) {
        let result;
        result = await dbUtils.query(`INSERT INTO ?? SET ?`, [table_name, params]);
        return result;
    },
};

module.exports = common;