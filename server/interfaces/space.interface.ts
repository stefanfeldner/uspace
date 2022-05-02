import { Space } from '@prisma/client';

export interface ISpace{
  id: number,
  name: string,
  description: string,
  createdAt: Date,
}

export interface IIncomingSpace extends Omit<Space, 'id'|'created_at'>{}
