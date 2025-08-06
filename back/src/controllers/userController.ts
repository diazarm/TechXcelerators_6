//Estructura básica del controlador de usuario en TypeScript
import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const getUsers = (req: Request, res: Response) => {
    const users = userService.getUsers();
    res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const user = userService.getUserById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

export const createUser = (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
    // TODOS: A futuro hay que encriptar la contraseña antes de guardar el usuario (por ejemplo, usando bcrypt)
    const newUser = userService.createUser(name, email, password);
    res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const updatedData = req.body;
    const updatedUser = userService.updateUser(id, updatedData);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

export const deleteUser = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const success = userService.deleteUser(id);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

