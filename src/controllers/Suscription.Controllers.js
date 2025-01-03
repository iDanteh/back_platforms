import Suscripcion from '../models/Suscripcion.Model.js';
import History from '../models/History.Model.js';
import Cliente from '../models/User.Model.js';
import Plataforma from '../models/Platform.Model.js';
import { where } from 'sequelize';

export const getSuscriptions = async (req, res) => {
    try {
        const suscription = await Suscripcion.findAll();
        res.status(200).json(suscription);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las suscription'});
    }
}

export const getSuscripcionById = async (req, res) => {
    try {
        const suscription = await Suscripcion.findByPk(req.params.id_Suscription);

        if(!suscription){
            res.status(404).json({ error: 'Suscripción no encontrada'});
        }
        res.status(200).json({ suscription });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la Suscripción'});
    }
}

export const registerSuscripcion = async (req, res) => {
    try {
        const { fk_user, fk_Platform, type_suscription, start_date, finish_date, state } = req.body;

        // Verificar que el usuario existe
        const usuario = await Cliente.findByPk(fk_user);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar que la plataforma existe
        const plataforma = await Plataforma.findByPk(fk_Platform);
        if (!plataforma) {
            return res.status(404).json({ error: 'Plataforma no encontrada' });
        }

        const nuevaSuscripcion = await Suscripcion.create({
            fk_user,
            fk_Platform,
            type_suscription,
            start_date,
            finish_date,
            state,
        });

        // Registrar la nueva suscripción en la tabla History
        await History.create({
            fk_User: fk_user,
            fk_Platform: fk_Platform,
            fk_Suscription: nuevaSuscripcion.id_Suscription,
            fk_Admin: null,
        });

        res.status(201).json({
            message: 'Suscripción registrada exitosamente',
            suscripcion: nuevaSuscripcion,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la suscripción' });
    }
};

export const updateSuscripcion = async (req, res) => {
    try {
        const { id_Suscription } = req.params;
        const { type_suscription, start_date, finish_date, state } = req.body;

        const suscripcion = await Suscripcion.findByPk(id_Suscription);

        if (!suscripcion) {
            return res.status(404).json({ error: 'Suscripción no encontrada' });
        }

        suscripcion.type_suscription = type_suscription || suscripcion.type_suscription;
        suscripcion.start_date = start_date || suscripcion.start_date;
        suscripcion.finish_date = finish_date || suscripcion.finish_date;
        suscripcion.state = state || suscripcion.state;

        await suscripcion.save();

        await History.create({
            fk_User: suscripcion.fk_user,
            fk_Admin: null,
            fk_Suscripcion: id_Suscription,
            fk_Platform: suscripcion.fk_Platform,
        });

        res.status(200).json({ message: 'Suscripción actualizada exitosamente', suscripcion });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar la suscripción' });
    }
};

export const deleteSuscripcion = async (req, res) => {
    try {
        const { id_Suscription } = req.params;

        const suscripcion = await Suscripcion.findByPk(id_Suscription);

        if (!suscripcion) {
            return res.status(404).json({ error: 'Suscripción no encontrada' });
        }

        // Eliminar la suscripción
        await suscripcion.destroy();

        await History.create({
            fk_User: suscripcion.fk_user,
            fk_Admin: null,
            fk_Suscripcion: id_Suscription,
            fk_Platform: suscripcion.fk_Platform,
        });

        res.status(200).json({ message: 'Suscripción eliminada exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar la suscripción' });
    }
};