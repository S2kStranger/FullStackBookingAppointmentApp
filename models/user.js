const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNULL: false,
        primaryKey: true
    },
    name:  Sequelize.STRING,
    email:  {
        type: Sequelize.STRING,
        unique: true
    },
    phone_no: {
        type: Sequelize.STRING,
        unique: true
    }
});

module.exports= User;