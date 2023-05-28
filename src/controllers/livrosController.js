import livros from '../models/Livro.js';
import NotFound from '../errors/NotFound.js';

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const response = await livros.find()
        .populate('autor')
        .exec();
      res.status(200).json(response);       
      
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    const { id } = req.params;

    try {
      const response = await livros.findById(id)
        .populate('autor', 'nome')
        .exec();

      if(!response) return next(new NotFound);

      res.status(200).json(response);
      
    } catch (error) {

      next(error);           
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    let livro = new livros(req.body);

    try {
      const response = await livro.save();
      return res.status(201).json(response);    
      
    } catch (error) {
      next(error);     
    }

  };

  static atualizarLivro = async (req, res, next) => {
    const { id } = req.params;

    try {
      const response = await livros.findByIdAndUpdate(id, {$set: req.body}, {new: true});

      if(!response) return next(new NotFound);

      return res.status(200).json(response);    
      
    } catch (error) {

      next(error);      
    }  
  };

  static excluirLivro = async (req, res, next) => {
    const { id } = req.params;

    try {
      const response = await livros.findByIdAndDelete(id);

      if(!response) return next(new NotFound);

      res.status(204).send();      
    } catch (error) {
      next(error);
      
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    const editora = req.query.editora;

    try {
      const result =  await livros.find({'editora': editora});
      return res.status(200).json(result);

    } catch (error) {
      next(error);
    }
  };
  
}

export default LivroController;