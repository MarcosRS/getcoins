const path = require('path');
const Sequelize = require('sequelize');

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_NAME = process.env.DB_NAME 
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_PORT = process.env.DB_PORT || '5432'

const databaseUri = `postgres://${DB_USER ? DB_USER + ':' :''}${DB_PASS ? DB_PASS + '@': '' }${DB_HOST}:${DB_PORT}/${DB_NAME}`

console.log('Opening connection to PostgreSQL');
// create the database instance
module.exports = new Sequelize(databaseUri, {
  dialect: 'postgres',
  logging: false, // set to console.log to see the raw SQL queries
  native: true, // lets Sequelize know we can use pg-native for ~30% more speed
  operatorsAliases: false
});
