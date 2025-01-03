import express from 'express';
import { PORT } from './config.js';
import sequelize from './database/conexion.js';
import usersRoutes from './routes/Users.routes.js';
import adminRoutes from './routes/Admin.routes.js';
import platformRoutes from './routes/Platform.routes.js';
import suscriptionRoutes from './routes/Suscription.routes.js';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(morgan('dev'));
app.use(express.json());
app.use(usersRoutes);
app.use(adminRoutes);
app.use(platformRoutes);
app.use(suscriptionRoutes);


app.listen(PORT);
console.log('Listening on port ', PORT);
// Prueba para la conexión con la base de datos workbench
async function tectConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa')
    } catch (error) {
        console.log('Error al conectarse a la base de datos', error)
    }
}

tectConnection();