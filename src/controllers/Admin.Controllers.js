import Administrador from '../models/Admin.Model.js';
import History from '../models/History.Model.js';
import bcrypt from 'bcrypt';

export const getAdminById = async(req, res) =>{
    try {
        const admin = await Administrador.findByPk(req.params.id_Admin);
        if(!admin){
            return res.status(404).json({ error: 'Administrador no encontrado'});
        }
        res.status(200).json(admin);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el Administrador'});
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(req.body);

        // Buscar el correo del administrador
        const admin = await Administrador.findOne({ where: {email: email}});
        if(!admin){
            return res.status(404).json({ error: 'Administrador no existente'});
        }

        // Verificar contraseña encriptada
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        return res.status(200).json({admin});

    } catch (error) {
        return res.status(500).json({error: 'Error al iniciar sesión'})
    }
}

export const register = async (req, res) => {
    try {
        const {name_admin, email, password} = req.body;
        console.log(req.body);

        // Verificar que no hayan administradores duplicados
        const admin = await Administrador.findOne({ where: {email: email}});
        if (admin){
            return res.status(409).json({ error: 'Correo ya registrado'});
        }

        // Encriptar la contraseña del administrador
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Registrar al nuevo admin
        const newAdmin = await Administrador.create({
            name_admin,
            email,
            password: encryptedPassword
        });

        await History.create({
                    fk_User: null,
                    fk_Admin: newAdmin.id_Admin,
                    fk_Platform: null,
                    fk_Suscription: null,
                });
        res.status(201).json({newAdmin});
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión'});
    }
}

export const deleteAdmin = async (req, res) =>{
    try {
        const admin = await Administrador.findByPk(req.params.id_Admin);
        if(!admin){
            return res.status(404).json({ error: 'Administrador no encontrado'});
        }
        await admin.destroy();
        res.status(200).json({ message: 'Administrador eliminado'});
    } catch (error) {
        console.log(error)
    }
};

export const updateAdmin = async (req, res) =>{
    try {
        const admin = await Administrador.findByPk(req.params.id_Admin);
        if(!admin){
            return res.status(404).json({ error: 'Administrador no encontrado'});
        }
        const {name_admin, email, password} = req.body;
        admin.name_admin = name_admin;
        admin.email = email;
        admin.password = password;
        await admin.save();
        res.status(200).json({ message: 'Administrador actualizado'});
    } catch (error) {
        console.log(error)
    }
};