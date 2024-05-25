import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import userRouter from './routes/routers/userRouter/userRouter';
import requestLogger from './routes/middlewares/requestLogger';
import adminRouter from './routes/routers/adminRouter/adminRouter';
import connectDb from '../resources/database/connectDb';

dotenv.config();
const app = express();
const { PORT, SESSION_SECRET_KEY } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: SESSION_SECRET_KEY ?? '',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(requestLogger);

app.use('/users', userRouter);
app.use('/admin', adminRouter);

connectDb();

app.get('/', (request, response) => {
  response.status(200).send('INICIO');
});

app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDb();
  })
  .on('error', (error) => {
    console.log('Error starting server:', error);
  });
