import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/conexion.js';

// Clase para crear el modelo de los usuarios
class Users extends Model{}

Users.init({
    id_User: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name_user: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    phone_user: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
},
{
    sequelize,
    modelName: 'Users',
    freezeTableName: true,
    tableName: 'users',
    timestamps: false,
}
);

sequelize.sync().then(() => {
    console.log('Tabla de usuarios creada exitosamente');
}).catch(error => {
    console.log('Error al crear la tabla de usuarios');
});

export default Users;