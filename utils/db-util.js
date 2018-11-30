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
    // console.log('---->');
    // console.log(` sql:   ${sql}  \n values:   ${values}`);
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
                        console.log(results)
                        resolve(results);
                    }
                    connection.release()
                })
            }
        })
    })
};

let baseQuery = sql => {
    // console.log('---->');
    // console.log(` sql:   ${sql}  \n values:   ${values}`);
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
            } else {
                connection.query(sql, (err, rows) => {
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

module.exports = {
    baseQuery,
    query,
};