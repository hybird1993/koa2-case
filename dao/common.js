const dbUtils = require('./../utils/db-util');

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
}

module.exports = common;