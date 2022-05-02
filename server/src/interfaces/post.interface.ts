export interface Post {
    post_id?: number;
    space_id: number;
    user_id: string;
    title: string;
    tags: string;
    content?: string;
    created_at?: Date;
}