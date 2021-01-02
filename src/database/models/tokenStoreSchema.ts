import { IToken } from "../types/types";
import mongoose, { Schema } from 'mongoose';

const tokenStore = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    rank: {
        type: String,
        required: true
    }
})

export const tokenStoreModel = mongoose.model<IToken>('tokenstore', tokenStore);