import mongoose from 'mongoose';

const url = process.env.MONGO_URI as string;

let isConnected = false;
async function connectDb() {
  if (isConnected) {
    console.log('MARTIN_LOG => using existing database connection');
    return Promise.resolve();
  }
  console.log('MARTIN_LOG => using new database connection');

  console.log('MARTIN_LOG=> connectDb');
  try {
    mongoose.connect(url, {
      serverApi: { version: '1', strict: true, deprecationErrors: true },
      dbName: 'auth-email-token',
    });
    isConnected = true;
  } catch (err) {
    console.error(err.message);
    isConnected = false;
    mongoose.disconnect();
  }
  const dbConnection = mongoose.connection;
  dbConnection.once('open', () => {
    console.log(`Database connected: ${url}`);
    isConnected = true;
  });

  dbConnection.on('error', (err) => {
    console.error(`connection error: ${err}`);
    isConnected = false;
  });
}

export default connectDb;
