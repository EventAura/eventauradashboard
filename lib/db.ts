import mongoose,{Mongoose} from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/TESRACTDB';

interface MongooseConn {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConn= (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connect = async () => {
    if (cached.conn) return cached.conn;
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'TESRACTDB',
        bufferCommands: false,
        connectTimeoutMS: 30000,

}
    );
    cached.conn = await cached.promise;
    return cached.conn;
}