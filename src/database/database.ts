import { config } from 'dotenv';
import mongoose from 'mongoose';
import logg from '../utils/logger';
config();

const uri: string = process.env.CONNECTION_STRING || '';

const connectToDb = () => mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => logg.green(1, 'MongoDB', 'Connected'))
.catch(error => logg.error(2, 'MongoDB Connected', error));

export default connectToDb;