const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dentest_clinic', 'root', '', {
	dialect: 'mysql',
	host: '127.0.0.1',
	logging: false
});


module.exports = {
	sequelize,
	Sequelize
};