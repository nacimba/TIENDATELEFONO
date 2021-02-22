/*ILoginForm es un interface, ojo las variables de entrada son string y obligatorias si va con ! es que no son  ejemplo string ! */
export interface ILoginForm {
    email: string;
    password: string;
}
/*añadimos otra interface*/
export interface IResultLogin {
    status: boolean;
    message: string;
    token?: string;
}