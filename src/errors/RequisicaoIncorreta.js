import ErrorBase from './ErrorBase.js';

class BadRequest extends ErrorBase{
  constructor(){
    super('Um ou mais dados estão incorretos', 400);
  }    
}

export default BadRequest;