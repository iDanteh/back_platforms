import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'platforms',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'LeninRonaldo717',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
        logging: false,
    }
);

export default sequelize;
