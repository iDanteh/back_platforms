import { Model, DataTypes } from 'sequelize';
import Users from './User.Model.js'
import Platform from './Platform.Model.js'
import sequelize from '../database/conexion.js';

// Clase para crear el modelo de las suscripciones
class Suscription extends Model{}

Suscription.init({
    id_Suscription: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
    },
    fk_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id_User',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    fk_Platform: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Platform,
            key: 'id_Platform',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },    
},
{
    sequelize,
    modelName: 'Suscription',
    freezeTableName: true,
    tableName: 'suscription',
    timestamps: false,
}
);

sequelize.sync().then(() => {
    console.log('Tabla de suscription creada exitosamente');
}).catch(error => {
    console.log('Error al crear la tabla de suscription');
});

export default Suscription;