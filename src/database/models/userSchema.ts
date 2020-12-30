import { IUser } from '../types/types';
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
        userId: {
            type: Number,
            required: true,
            unique: true
        },
        rank: {
            type: String,
            required: true
        },
        userName: String,
        firstName: String,
        lastName: String,
        menuId: Number,
        token: {
            type: String,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true,
    },
)

export const UserModel = mongoose.model<IUser>('user', UserSchema);