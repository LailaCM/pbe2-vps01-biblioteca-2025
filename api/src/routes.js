const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Biblioteca ACME' });
});

const Aluno = require('./controller/controlleraluno')
const Livro = require('./controller/controllerlivro')
const Emprestimo = require('./controller/controlleremprestimo')

routes.post('/aluno', Aluno.create);
routes.get('/aluno', Aluno.read);
routes.get('/aluno/:ra', Aluno.readOne);
routes.put('/aluno/:ra', Aluno.update);
routes.delete('/aluno/:ra', Aluno.remove);

routes.post('/livro', Livro.create);
routes.get('/livro', Livro.read);
routes.put('/livro/:id', Livro.update);
routes.delete('/livro/:id', Livro.remove);

routes.post('/emprestimo', Emprestimo.create);
routes.get('/emprestimo', Emprestimo.read);
routes.put('/emprestimo/:id', Emprestimo.update);
routes.delete('/emprestimo/:id', Emprestimo.remove);

module.exports = routes;
