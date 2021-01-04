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
        authorId: {
            type: Number,
            required: true
        },
        intervalValue: {
            type: Number,
            default: null
        },
        limit: {
            type: Number,
            default: null
        }
    },
    {
        timestamps: true,
    },
)

export const CategoryModel = mongoose.model<ICategory>('category', CategorySchema);