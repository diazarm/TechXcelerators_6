//Ejemplo de modelo de usuario en TypeScript super básico
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}