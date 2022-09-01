const env = process.env;

const config = {
  listPerPage: env.LIST_PER_PAGE || 200,
}

module.exports = config;