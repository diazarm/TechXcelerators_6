//Estructura básica del servicio de usuario en TypeScript
import { User } from '../models/User';

export class UserService {
    private users: User[] = []; // Simulación de base de datos en memoria
    private currentId = 1;

    getUsers(): User[] {
        return this.users;
    }

    getUserById(id: number): User | null {
        return this.users.find(user => user.id === id) || null;
    }

    createUser(name: string, email: string, password: string): User {
        const newUser: User = {
            id: this.currentId++,
            name,
            email,
            password,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: number, updatedData: Partial<User>): User | null {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            const updatedUser: User = {
                ...this.users[userIndex],
                ...updatedData,
                updatedAt: new Date()
            };
            this.users[userIndex] = updatedUser;
            return updatedUser;
        }
        return null;
    }

    deleteUser(id: number): boolean {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return true;
        }
        return false;
    }
};

export const userService = new UserService();
