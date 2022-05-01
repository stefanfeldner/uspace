export interface Post {
    space_id: number;
    user_id: string;
    title: string;
    tags: string[];
    content?: string;
    created_at?: Date;
}