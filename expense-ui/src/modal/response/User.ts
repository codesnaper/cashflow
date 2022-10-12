import { Profile } from "./Profile";

export interface User{
    user: {
        name?: string;
        email?: string;
    }
    profile?: Profile
    username?: string;
    name?: string;
    phone_number?: string;
}

export interface LoginCredential{
    username: string;
    password: string;
}

export interface UserToken{
    token: string | null;
    refreshToken: string | null;
    expireIn: string | null;
}