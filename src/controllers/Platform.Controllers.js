import Platform from '../models/Platform.Model.js';
import History from '../models/History.Model.js';

export const getPlatforms = async (req, res) => {
    try {
        const plataformas = await Platform.findAll();
        res.status(200).json(plataformas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las plataformas'});
    }
}

export const getPlatformById = async (req, res) => {
    try {
        const plataformas = await Platform.findByPk(req.params.id_Platform);

        if(!plataformas){
            res.status(404).json({ error: 'Plataforma no encontrada'});
        }
        res.status(200).json({ plataformas });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la plataforma'});
    }
}

export const registerPlatform = async (req, res) => {
    try {
        const {name_platform, price} = req.body;

        // Verificar si la plataforma no existe
        const plataforma = await Platform.findOne({ where: { name_platform } });
        if(plataforma){
            return res.status(409).json({ error: 'Plataforma ya registrada'});
        }

        // Convertir el nombre a mayúsculas
        const name_Upper = name_platform.toUpperCase();

        const newPlatform = await Platform.create({
            name_platform: name_Upper,
            price
        });

        await History.create({
            fk_User: null,
            fk_Admin: null,
            fk_Platform: newPlatform.id_Platform,
            fk_Suscription: null,
        });

        return res.status(201).json({ newPlatform });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al registrar la plataforma'});
    }
}

export const delePlatform = async (req, res) => {
    try {
        const plataforma = await Platform.findByPk(req.params.id_Platform);
        if(!plataforma){
            return res.status(404).json({ error: 'Plataforma no encontrada'});
        }
        await plataforma.destroy();
        res.status(200).json({ message: 'Plataforma eliminada'});
    } catch (error) {
        console.log(error)
    }
}

export const updatePlatform = async (req, res) => {
    try {
        const plataforma = await Platform.findByPk(req.params.id_Platform);
        if(!plataforma){
            return res.status(404).json({ error: 'Plataforma no encontrada'});
        }
        const {name_platform, price} = req.body;
        plataforma.name_platform = name_platform;
        plataforma.price = price;
        await plataforma.save();
        res.status(200).json({ message: 'Plataforma actualizada'});
    } catch (error) {
        console.log(error)
    }
}