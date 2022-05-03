import { Post } from "./post.interface";
import { Space_Colab } from "./space_colab.interface";

export interface Space {
    space_id?: number;
    name: string;
    owner: string;
    description?: string;
    created_at?: Date | null;
    post?: Post[];
    space_colab?: Space_Colab[] | [];
}