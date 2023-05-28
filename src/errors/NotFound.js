import ErrorBase from './ErrorBase.js';

class NotFound extends ErrorBase{
  constructor(){
    super('Página não encontrada ', 404);
  }    
}

export default NotFound;