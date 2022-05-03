export interface User {
    sub: string;
    email: string;
    email_verified?: boolean | null;
    username: string;
    picture_url: string | null;
    created_at?: Date | null;
}