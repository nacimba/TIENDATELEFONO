export interface IUser {
    id: string;
    name: string;
    lastname: string;
    email: string;
    registerDte?: string;
    /* el ?: significa que es opcional */
    birthday?: string;
    role?: string;
}
