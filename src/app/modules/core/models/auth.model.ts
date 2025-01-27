export interface IUser {
    email: string;
    role: string;
    token: string;
}

export interface AuthResponse {
    code: number;
    message: IUser;
    timestamp: string;
}

export class User implements IUser{
    constructor(
        public email: string, 
        public role: string,
        public token: string
    ){}
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface LoggedInResponse{
    message: boolean;
}

export interface ToResetPasswordData {
    email : string;
}

export interface ChangePasswordData {
    uuid: string;
    password: string;
}
