import livros from '../models/Livro.js';
import NotFound from '../errors/NotFound.js';
import autores from '../models/Autor.js';

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const response = livros.find();
      
      req.resultado = response;

      next();

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

  static listarLivroPorFiltro = async (req, res, next) => {    
    try {
      const busca = await processaBusca(req.query);

      if(busca !== null){

        const livrosResultado = livros
          .find(busca)
          .populate('autor');  
        
        req.resultado = livrosResultado;  
        next();
      }else{
        return res.status(200).send([]);
      }

    } catch (error) {
      next(error);
    }
  };
  
}

async function processaBusca(parametros){

  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  const regex = new RegExp(titulo, 'i');
  
  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = regex;

  if(minPaginas || maxPaginas) busca.numeroPaginas = {};  

  if(minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if(nomeAutor){
    const autor = await autores.findOne({ nome: nomeAutor});

    if(autor !==null){
      busca.autor = autor._id;
    }else{
      busca = null;
    }
    return busca;
  }
}

export default LivroController;