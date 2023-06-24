import mongoose  from 'mongoose';
import ErrorBase from '../errors/ErrorBase.js';
import NotFound from '../errors/NotFound.js';
import BadRequest from '../errors/RequisicaoIncorreta.js';
import ValidationError from '../errors/ValidationError.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = ((error, req, res, next) => {
  
  if (error instanceof mongoose.Error.CastError) return new BadRequest().enviarResposta(res);    

  else if (error instanceof mongoose.Error.ValidationError) return new ValidationError(error).enviarResposta(res);

  else if( error instanceof ErrorBase)  error.enviarResposta(res);

  return new ErrorBase().enviarResposta(res);
  
});
  
export default errorHandler;