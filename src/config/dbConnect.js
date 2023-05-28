import mongoose from 'mongoose';

const conection = {
  local: 'mongodb://admin:secret@localhost:27017/livraria?authSource=admin',
  mongo: 'mongodb://admin:secret@mongo:27017/livraria?authSource=admin'
};

mongoose.connect(conection.local);

let db = mongoose.connection;

export default db;