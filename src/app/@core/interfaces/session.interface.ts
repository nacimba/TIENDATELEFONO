import { IUser } from './user.interface';


export interface ISession {
    expiresIn: string;
    token?: string;
}
export interface IMeData {
    status: boolean;
    /*? es una propiedad optativa */
    message?: string;
    /*user:Iuser*/
    user?: IUser;
                }