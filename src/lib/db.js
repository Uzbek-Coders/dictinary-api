import mongoose from 'mongoose';
import 'dotenv/config';
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_CONNECT,
 { dbName: 'test' })
    .then(() => {
        console.log('MongoDBga ulanish hosil qilindi...');
    })
    .catch((err) => {
        console.error("MongoDBga ulanish vaqtida xato ro'y berdi...", err);
});

export default mongoose;