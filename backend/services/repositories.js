const db = require('./db');
const config = require('../config');

function getAllRepositories(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM repository LIMIT ?,?`, [offset, config.listPerPage]);
  const meta = {page};

  return {
    data,
    meta
  }
}

function getAllRepositoriesByUsername(username = "") {
  const data = db.query(`SELECT * FROM repository WHERE username like ?`, [username]);
  return data
}

function getAllUsers() {
  const data = db.query(`SELECT DISTINCT username FROM repository`, []);
  return data
}

module.exports = {
  getAllRepositories,
  getAllRepositoriesByUsername,
  getAllUsers
}