import fs from 'fs';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Keyword from './models/Keyword';
import ChatBot from './ChatBot';

// connect mongoose
mongoose.connect('mongodb://localhost/chatbot');
mongoose.Promise = Promise;

const db = mongoose.connection;
db.on('open', () => {
  console.log('DB connected');

  // initialize collection
  const data = fs.readFileSync('botDictionary.dat', 'UTF-8').split('\n');
  const keywords = data.map(d => {
    const [ key, pattern, msg ] = d.split(', ');
    return ( key && pattern && msg ? { key, pattern, msg } : null );
  }).filter(d => d != null);

  Keyword.collection.drop((err) => {
    if (err) {
      console.error(err);
      return;
    }

    Keyword.collection.insert(keywords, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('collection initialized');
    });
  })
});

// express config
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// express router
app.post('/message', async (req, res) => {
  const { msg } = req.body;

  const resMsg = await ChatBot.talk(msg);
  res.status(200).send({ msg: resMsg });
});

// run server
const PORT = 3000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
