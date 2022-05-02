export interface User {
    sub: string;
    email: string;
    email_verified: boolean;
    username: string;
    picture_url?: string;
    created_at?: Date;
}