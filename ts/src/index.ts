import express from "express";
import morgan from 'morgan';

import logger from './logging';

const app = express();
app.use(morgan('combined', {
  stream: {
    write(str: string) {
      logger.info(str);
    }
  }
}));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(3000, () => {
  logger.info("Start listening on 3000.");
});