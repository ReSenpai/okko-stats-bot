import { Document } from 'mongoose';

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
    counter: number
}