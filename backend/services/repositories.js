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
  const data = db.query(`SELECT * FROM repository WHERE username = ?`, [username]);
  const meta = {username}
  return {
    data,
    meta
  }
}

function getAllUsers() {
  const data = db.query(`SELECT DISTINCT username FROM repository`, null);
  return {
    data
  }
}

module.exports = {
  getAllRepositories,
  getAllRepositoriesByUsername,
  getAllUsers
}