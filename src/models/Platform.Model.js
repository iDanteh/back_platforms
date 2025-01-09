import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/conexion.js';

// Clase para crear el modelo de las plataformas
class Platform extends Model{}

Platform.init({
    id_Platform: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name_platform: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
},
{
    sequelize,
    modelName: 'Platform',
    freezeTableName: true,
    tableName: 'platform',
    timestamps: false,
}
);

sequelize.sync().then(() => {
    console.log('Tabla de platform creada exitosamente');
}).catch(error => {
    console.log('Error al crear la tabla de platform');
});

export default Platform;