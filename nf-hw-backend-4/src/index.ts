import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import connectDB from './db'
import globalRouter from './routes/global-router'
import { logger } from './logger'
import { createBucket, listBuckets } from './middlewares/s3-middlewares'
import cors from 'cors'
import WebSocket from 'ws'

connectDB()

const app = express()
const httpServer = createServer(app)
const wss = new WebSocket.Server({ server: httpServer })

let currentTrack = null;
wss.on('connection', (ws) => {
  console.log('Client connected');

  if (currentTrack) {
      ws.send(JSON.stringify({ type: 'CURRENT_TRACK', data: currentTrack }));
  }

  ws.on('message', (message) => {
      const data = JSON.parse(message);
      if (data.type === 'SET_CURRENT_TRACK') {
          currentTrack = data.data;
          wss.clients.forEach((client) => {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({ type: 'CURRENT_TRACK', data: currentTrack }));
              }
          });
      }
  });

  ws.on('close', () => {
      console.log('Client disconnected');
  });
});

app.use(express.json())
app.use(logger)
app.use(cors()) // Добавление CORS middleware
app.use('/api/v5', globalRouter)

httpServer.listen(5000, () => {
  console.log('server running at http://localhost:5000/api/v5')
})
