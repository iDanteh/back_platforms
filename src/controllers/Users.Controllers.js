import Users from '../models/User.Model.js';
import History from '../models/History.Model.js';

export const getUsers =  async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios'});
    }
}

export const getUserById = async(req, res) =>{
    try {
        const users = await Users.findByPk(req.params.id_User);
        if(!users){
            return res.status(404).json({ error: 'Usuario no encontrado'});
        }
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el usuario'});
    }
};

export const registerUser = async (req, res) => {
    try {
        const { name_user, email, phone_user } = req.body;
        console.log(req.body);
        
        // Verificar si el usuario ya existe
        const users = await Users.findOne({ where: { email: email } });
        if (users) {
            return res.status(409).json({ error: 'El correo ingresado ya existe' });
        }
        
        // Crear el nuevo usuario
        const newUser = await Users.create({ name_user, phone_user, email });

        await History.create({
            fk_User: newUser.id_User,
            fk_Admin: null,
            fk_Platform: null,
            fk_Suscription: null,
        });

        return res.status(201).json({newUser});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

export const deleteUser = async (req, res) =>{
    try {
        const users = await Users.findByPk(req.params.id_User);
        if(!users){
            return res.status(404).json({ error: 'Usuario no encontrado'});
        }
        await users.destroy();
        res.status(200).json({ message: 'Usuario eliminado'});
    } catch (error) {
        console.log(error)
    }
};

export const updateUser = async (req, res) =>{
    try {
        const users = await Users.findByPk(req.params.id_User);
        if(!users){
            return res.status(404).json({ error: 'Usuario no encontrado'});
        }
        const {name_user, phone_user, email} = req.body;
        users.name_user = name_user;
        users.phone_user = phone_user;
        users.email = email;
        await users.save();
        res.status(200).json({ message: 'Usuario actualizado'});
    } catch (error) {
        console.log(error)
    }
};