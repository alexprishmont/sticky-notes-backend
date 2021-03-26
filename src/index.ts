import throng from 'throng';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import { App } from './app';
import { config } from './config';
import { Logger } from './utils/logger';

const startServer = async () => {
  const mongooseOptions: object = {
    useNewUrlParser: true,
    promiseLibrary: global.Promise,
    useUnifiedTopology: true,
  };

  try {
    await Promise.all([
      mongoose.connect(config.connection.uri, mongooseOptions),
      https.createServer({
        key: fs.readFileSync('./cert/server.key'),
        cert: fs.readFileSync('./cert/server.cert')
      }, App).listen(config.port),
    ]);
    
    Logger.info(`Server has started on port: ${config.port}`);
  } catch (error) {
    Logger.error(`Could not start the app: ${error}`);
  }
};

throng({ worker: startServer, workers: config.workers, lifetime: Infinity });
