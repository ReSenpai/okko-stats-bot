import { ERanks, IUser } from '../types/types';
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
        userId: {
            type: Number,
            required: true,
            unique: true
        },
        rank: {
            type: String,
            default: ERanks.User
        },
        userName: {
            type: String,
            default: null
        },
        firstName: {
            type: String,
            default: null
        },
        lastName: {
            type: String,
            default: null
        },
        menuId: {
            type: Number,
            default: null
        },
        token: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true,
    },
)

export const UserModel = mongoose.model<IUser>('user', UserSchema);