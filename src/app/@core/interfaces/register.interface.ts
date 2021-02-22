import { IUser } from './user.interface';
/* 1 almacenamos la interface para almacenar los datos del registro */
export interface IRegisterForm{
    name: string;
    lastname: string;
    email: string;
    password: string;
    birthday: string;
}

/* 2 añadiremos el modulo de formularios  con angularforms FormsModule
vamos a pages -> forms ---> register y lo metemos en el register.module 
vasandonos en el login metemos el FormsModule*/

export interface IResultRegister {
    status: boolean;
    message: string;
    user?: IUser;
}