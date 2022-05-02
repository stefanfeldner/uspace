export interface Comment {
    comment_id?: number;
    user_id: string;
    post_id: number;
    content: string;
    created_at?: Date;
}