import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/conexion.js';

// Clase para crear el modelo de los administradores
class Administrador extends Model{}

Administrador.init({
    id_Admin: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name_admin: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
},
{
    sequelize,
    modelName: 'Administrador',
    freezeTableName: true,
    tableName: 'administrador',
    timestamps: false,
}
);

sequelize.sync().then(() => {
    console.log('Tabla de administrador creada exitosamente');
}).catch(error => {
    console.log('Error al crear la tabla de administrador');
});

export default Administrador;