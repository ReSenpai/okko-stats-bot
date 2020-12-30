import { Document } from 'mongoose';

export type TAuthor = {
    firstName: string | null
    lastName: string | null
    username: string | null
}

export enum errorCode {
    Duplicate = 11000
}

export interface IUser extends Document {
    userId: number
    rank: string
    userName: string
    firstName: string
    lastName: string
    menuId: number
    token: string
}

export interface ICategory extends Document {
    name: string
    counter: number,
    author: TAuthor
}