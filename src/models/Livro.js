import mongoose from 'mongoose';

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, 'nome do titulo é obrigatório']
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'autores', 
      required: [true, 'autor é obrigatório']
    },
    editora: {
      type: String, 
      required: [true, 'nome da editora é obrigatório']
    },
    numeroPaginas: {type: Number}
  }
);

const livros= mongoose.model('livros', livroSchema);

export default livros;