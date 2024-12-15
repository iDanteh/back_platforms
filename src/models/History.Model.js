import { Model, DataTypes } from 'sequelize';
import Users from './User.Model.js'
import Platform from './Platform.Model.js'
import Suscription from './Suscripcion.Model.js'
import Administrador from './Admin.Model.js'
import sequelize from '../database/conexion.js';

// Clase para crear el modelo para la tabla historial
class History extends Model{}

History.init({
    id_History: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    fk_Admin: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Administrador,
            key: 'id_Admin',
        },
    },
    fk_User: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Users,
            key: 'id_User', 
        },
    },
    fk_Platform: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Platform,
            key: 'id_Platform', 
        },
    },
    fk_Suscription: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Suscription,
            key: 'id_Suscription', 
        },
    },    
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
},
{
    sequelize,
    modelName: 'History',
    freezeTableName: true,
    tableName: 'history',
    timestamps: false,
}
);

History.associate = (models) => {
    History.belongsTo(models.Administrador, { foreignKey: 'fk_Admin', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    History.belongsTo(models.Users, { foreignKey: 'fk_User', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    History.belongsTo(models.Platform, { foreignKey: 'fk_Platform', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    History.belongsTo(models.Suscription, { foreignKey: 'fk_Suscription', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
};

sequelize.sync().then(() => {
    console.log('Tabla de history creada exitosamente');
}).catch(error => {
    console.log('Error al crear la tabla de history');
});

export default History;