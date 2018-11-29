const allConfig = require("../config");
const config = allConfig.database;
const mysql = require("mysql");

const pool = mysql.createPool({
    host: config.HOST,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE
});

let query = (sql, values) => {
    console.log('---->');
    console.log(` sql:   ${sql}  \n values:   ${values}`);
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                       // resolve(rows)
                        let results = JSON.stringify(rows);//把results对象转为字符串，去掉RowDataPacket
                        results = JSON.parse(results);
                      //  console.log(results)
                        resolve(results);
                    }
                    connection.release()
                })
            }
        })
    })
};

const createTable = function (sql) {
    return query(sql, []);
};

const findDataByKey = function (table, value, key = 'id') {
    const sql = `SELECT * from ?? WHERE ${key} = ?`;
    return query(sql, [table, value]);
};

const insert = function (table, params) {
    const sql = `INSERT INTO ${table} SET ?`;
    return query(sql, params);
};

module.exports = {
    query,
    createTable,
    findDataByKey,
    insert
};