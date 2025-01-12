import { Model, DataTypes } from 'sequelize';
import Users from './User.Model.js'
import Platform from './Platform.Model.js'
import sequelize from '../database/conexion.js';

// Clase para crear el modelo de las suscripciones
class Subscription extends Model{}

Subscription.init({
    id_Subscription: {
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
    perfil: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    finish_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            isIn: [['ACTIVO', 'INACTIVO', 'CANCELADO']],
        },
    },
    phone_user: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    platform: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    name_user: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'Subscription',
    freezeTableName: true,
    tableName: 'subscription',
    timestamps: false,
}
);

sequelize.sync().then(() => {
    console.log('Tabla de suscription creada exitosamente');
}).catch(error => {
    console.log('Error al crear la tabla de suscription');
});

export default Subscription;