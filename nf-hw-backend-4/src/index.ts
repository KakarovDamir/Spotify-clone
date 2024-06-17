import 'dotenv/config';
import express from 'express';
import http from 'node:http';
import connectDB from './db';
import globalRouter from './routes/global-router';
import { logger } from './logger';
import cors from 'cors';
import { Server } from 'socket.io';

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let users = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('registerUser', (data) => {
    users[socket.id] = data.email;
    io.emit('updateUsers', users);
  });

  socket.on('currentTrack', (data) => {
    const userEmail = users[socket.id];
    io.emit('updateTrack', { userEmail, track: data.track });
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('updateUsers', users);
    console.log('A user disconnected');
  });
});

app.use(express.json());
app.use(logger);
app.use(cors());
app.use('/api/v5', globalRouter);

server.listen(5000, () => {
  console.log('server running at http://localhost:5000/api/v5');
});
