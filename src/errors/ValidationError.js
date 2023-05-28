import ErrorBase from './ErrorBase.js';

class ValidationError extends ErrorBase {
  constructor(error) {
    const msgErro = Object.values(error.errors)
      .map((error) => error.message)
      .join('; ');
    super(`Erro de validação: ${msgErro} `, 400);
  }
}

export default ValidationError;
