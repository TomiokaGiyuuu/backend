const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    "social_media",
    "postgres",
    "root",
    {
        dialect: 'postgres',
        host: "localhost",
        port: "5432"
    }
)
