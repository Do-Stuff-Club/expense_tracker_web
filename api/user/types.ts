export interface NewUserParams {
    email: string;
    password: string;
    password_confirmation: string;
}

export interface LoginParams {
    email: string;
    password: string;
}

export interface UserData {
    id: number;
}
