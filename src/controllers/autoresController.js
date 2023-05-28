import NotFound from '../errors/NotFound.js';
import autores from '../models/Autor.js';

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const response = await autores.find();
      res.status(200).json(response);
      
    } catch (error) {
      next(error);
    }   
  };

  static listarAutorPorId = async (req, res, next) => {
    const { id } = req.params;
    
    try {
      const response = await autores.findById(id);
      
      if(!response) return next(new NotFound);

      return res.status(200).json(response);

    } catch (error) {
      next(error);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    
    let autor = new autores(req.body);
    
    try {
      await autor.save();
      return res.status(201).json(autor);
      
    } catch (error) {
      next(error);     
    }
  };

  static atualizarAutor = async (req, res, next) => {
    const { id } = req.params;

    try {
      const response = await autores.findByIdAndUpdate(id, {$set: req.body}, { new: true });

      if(!response) return next(new NotFound);

      return res.status(200).send(response);
      
    } catch (error) {
      next(error);
    }
  };

  static excluirAutor = async (req, res, next) => {
    const { id } = req.params;
    try {
      const response = await autores.findByIdAndDelete(id);

      if(!response) return next(new NotFound);

      return res.status(204).send();
      
    } catch (error) {
      next(error);
    }
  };
}

export default AutorController;