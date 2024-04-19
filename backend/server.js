import express from 'express';
const app = express();
import router from './routes/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';


dotenv.config();
app.use(express.json())

//adding socket.io configuration
const server = http.createServer(app);
const io = new Server(server);


const PORT = process.env.PORT || 6000

app.get("/", function (req,res){
  res.sendFile(
  path.join(__dirname,"../frontend/build/index.html"),
  function (err) {
    if (err) {
   res.status(500).send(err);
    }
  }
);
});

//routes
app.use('/api', router)


//io handling
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('add', () => {
    socket.broadcast.emit("new-add");

  })
})


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    server.listen(PORT, () => {
      console.log('listening for requests on port', PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 