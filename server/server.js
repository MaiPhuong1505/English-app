import express from 'express';
import { connectDB } from './database/conn.js';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import quizRouter from './routes/quizRouter.js';
import questionRouter from './routes/questionRouter.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import socketServer from './socketServer.js';
import historyRouter from './routes/historyRouter.js';
import grammarRouter from './routes/grammarRouter.js';
import path from 'path';
// import cookieParser from 'cookie-parser';
// const domain = process.env.DOMAIN || 'http://localhost:3000';
const corsOptions = {
  origin: '*',
};
const app = express();
const __dirname = path.dirname('');
const buildPath = path.join(__dirname, '../client/build');

app.use(express.static(buildPath));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: corsOptions,
});

io.on('connection', (socket) => {
  socketServer(socket, io);
});

app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// app.use(cookieParser);

app.use('/api', userRouter);
app.use('/api', quizRouter);
app.use('/api', questionRouter);
app.use('/api', historyRouter);
app.use('/sapling/', grammarRouter);

httpServer.listen(5001, () => {
  try {
    console.log('Socket server on');
  } catch (error) {
    console.log("Can't connect socket: ", error);
  }
});
app.listen(5000, () => {
  try {
    connectDB();
  } catch (error) {
    console.log("Can't connect to DB:", error);
  }
  console.log('Server run on port 5000');
});
