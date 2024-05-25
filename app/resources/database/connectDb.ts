import mongoose from 'mongoose';

const url = process.env.MONGO_URI as string;

async function connectDb() {
  try {
    mongoose.connect(url, {
      serverApi: { version: '1', strict: true, deprecationErrors: true },
    });
  } catch (err) {
    console.error(err.message);
    mongoose.disconnect();
  }
  const dbConnection = mongoose.connection;
  dbConnection.once('open', () => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on('error', (err) => {
    console.error(`connection error: ${err}`);
  });
}

export default connectDb;
