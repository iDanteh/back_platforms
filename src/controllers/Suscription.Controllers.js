import Suscripcion from '../models/Suscripcion.Model.js';
import History from '../models/History.Model.js';
import Cliente from '../models/User.Model.js';
import Plataforma from '../models/Platform.Model.js';

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
        const suscription = await Suscripcion.findByPk(req.params.id_Suscripcion);

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

        await History.create({
            fk_User: null,
            fk_Admin: null,
            fk_Suscripcion: newSuscripcion.id_Suscripcion,
            fk_Suscription: null,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al registrar la plataforma'});
    }
}

export const deleSuscripcion = async (req, res) => {
    try {
        const plataforma = await Suscripcion.findByPk(req.params.id_Suscripcion);
        if(!plataforma){
            return res.status(404).json({ error: 'Plataforma no encontrada'});
        }
        await plataforma.destroy();
        res.status(200).json({ message: 'Plataforma eliminada'});
    } catch (error) {
        console.log(error)
    }
}

export const updateSuscripcion = async (req, res) => {
    try {
        const plataforma = await Suscripcion.findByPk(req.params.id_Suscripcion);
        if(!plataforma){
            return res.status(404).json({ error: 'Plataforma no encontrada'});
        }
        const {name_Suscripcion, logo_Suscripcion} = req.body;
        plataforma.name_Suscripcion = name_Suscripcion;
        plataforma.logo_Suscripcion = logo_Suscripcion;
        await plataforma.save();
        res.status(200).json({ message: 'Plataforma actualizada'});
    } catch (error) {
        console.log(error)
    }
}