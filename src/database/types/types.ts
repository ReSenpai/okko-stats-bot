import { Document } from 'mongoose';

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
    limit: number
    timeSnapshot: Date
    multiplier: number
    cooldown: number
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