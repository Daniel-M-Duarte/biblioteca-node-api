import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import handler404 from './middleware/handler404.js';

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('conexão com o banco feita com sucesso');
});

const app = express();
app.use(express.json());

routes(app);

app.use(errorHandler);

app.use(handler404);

export default app;