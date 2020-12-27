import { ICategory } from './types';
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
    },
    {
        timestamps: true,
    },
)

export const CategoryModel = mongoose.model<ICategory>('category', CategorySchema);