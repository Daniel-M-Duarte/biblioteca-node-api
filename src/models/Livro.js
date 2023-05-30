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
      required: [true, 'nome da editora é obrigatório'],
      enum: {
        values: ['CDC', 'L&PM', 'April'],
        message: '{VALUE} não é permitido para editora'
      }
    },
    numeroPaginas: {
      type: Number,
      min: [50, 'Numero de páginas deve estar entre 500 e 5000'],
      max: [5000, 'Numero de páginas deve estar entre 500 e 5000']
    }
  }
);

const livros= mongoose.model('livros', livroSchema);

export default livros;