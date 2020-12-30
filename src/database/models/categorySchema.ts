import { ICategory } from '../types/types';
import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema({
        name: {
            type: String,
            required: true
        },
        counter: {
            type: Number,
            required: true,
            default: 0
        },
        author: {
            firstName: String,
            lastName: String,
            username: String
        }
    },
    {
        timestamps: true,
    },
)

export const CategoryModel = mongoose.model<ICategory>('category', CategorySchema);