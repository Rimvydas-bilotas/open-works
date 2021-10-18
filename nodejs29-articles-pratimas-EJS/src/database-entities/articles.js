const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const getArticles = async () => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [rows] = await con.execute('SELECT * FROM articles');
    console.log(rows);
    await con.end();
    return rows;
  } catch (e) {
    return e;
  }
};

module.exports = {
  getArticles,
};
