import NotFound from '../errors/NotFound.js';

const handler404 = (req, res, next) =>{
  new NotFound().enviarResposta(res);
  next(res);
};

export default handler404;