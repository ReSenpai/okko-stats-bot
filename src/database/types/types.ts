import { Document } from 'mongoose';

// TODO: delete ?
export type TAuthor = {
    firstName: string | null
    lastName: string | null
    username: string | null
}

export enum ErrorCode {
    Duplicate = 11000
}

export enum ERanks {
    SuperAdmin = 'SuperAdmin',
    Admin = 'Admin',
    User = 'User'
}

export interface IUser extends Document {
    userId: number
    rank: ERanks
    userName: string | null
    firstName: string | null
    lastName: string | null
    menuId: number | null
    token: string | null
}

export interface ICategory extends Document {
    name: string
    counter: number
    authorId: number
    intervalValue: number
    limit: number
}

export interface IToken extends Document {
    token: string
    rank: ERanks
}

export interface ICategoryStats extends Document {
    authorClickId: number
    categoryName: string
    categoryId: string
}