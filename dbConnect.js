const dbConfig = require("./dbConfig");
const mysql = require("serverless-mysql")({
  config: dbConfig,
});
module.exports = mysql;
