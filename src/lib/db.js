import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import 'dotenv/config';
mongoose.connect(process.env.MONGODB_CONNECT,
 { dbName: 'test' })
    .then(() => {
        console.log('MongoDBga ulanish hosil qilindi...');
    })
    .catch((err) => {
        console.error("MongoDBga ulanish vaqtida xato ro'y berdi...", err);
    });

export default mongoose;

