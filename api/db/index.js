
const util=require("util");
const mysql=require("mysql");
// const config=require("../../config/config.js");

const db = {
  createConnection: () => {
    const connection=mysql.createConnection({
      host: "localhost",
      user:"root",
      password:"root",
      database: "project",
      port:3306
    })
    return {
      query: (sql, args) => {
        return util.promisify(connection.query).call(connection, sql, args);
      },
      close: () => {
        return util.promisify(connection.end).call(connection);
      },
      beginTransaction: () => {
        return util.promisify(connection.beginTransaction).call(connection);
      },
      commit: () => {
        return util.promisify(connection.commit).call(connection);
      },
      rollback: () => {
        return util.promisify(connection.rollback).call(connection);
      },
    };
  },
  createPool: () => {
    const pool = mysql.createPool({
      timeout: 60 * 60 * 1000,
      host: appSettings.dbHost,
      user: appSettings.dbUserName,
      password: appSettings.dbPassWord,
      database: appSettings.dbName,
    });
    pool.getConnection((err, connection) => {
      if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
          ErrorHandler.extractError("Database connection was closed.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
          ErrorHandler.extractError("Database has too many connections.");
        }
        if (err.code === "ECONNREFUSED") {
          ErrorHandler.extractError("Database connection was refused.");
        }
      }
      if (connection) connection.release();
      return;
    });
    pool.query = util.promisify(pool.query);
    return pool;
  },
};
module.exports={
  db
};