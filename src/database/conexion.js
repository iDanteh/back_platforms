import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('platforms', 'root', 'LeninRonaldo717', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

export default sequelize;