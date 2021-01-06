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
        cooldown: {
            type: Number,
            default: 10
        },
        limit: {
            type: Number,
            default: 4
        },
        timeSnapshot: {
            type: Date,
            default: new Date('January 7, 1993 03:24:00')
        },
        multiplier: {
            type: Number,
            default: 1.0
        }
    },
    {
        timestamps: true,
    },
)

export const CategoryModel = mongoose.model<ICategory>('category', CategorySchema);