import { ICategoryStats } from './../types/types';
import mongoose, { Schema } from 'mongoose';

const CategoryStatsSchema = new Schema({
        authorClickId: {
            type: Number,
            required: true
        },
        categoryName: {
            type: String,
            required: true
        },
        categoryId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    },
)

export const CategoryStatsMdel = mongoose.model<ICategoryStats>('categoryStats', CategoryStatsSchema);