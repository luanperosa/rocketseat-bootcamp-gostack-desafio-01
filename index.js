const express = require('express');

const app = express();

const projects = [];

app.use(express.json())

function checkReqs(req, res, next){
  console.count('Requisição realizada')
  console.time('Tempo da Requisição');
  console.log('url da requisição', req.url);
  console.log('metodo da requisição', req.method)
  console.timeEnd('Tempo da Requisição');
  return next();
}

function checkIdExist(req, res, next) {
  const { id } = req.params;
  const project = projects.find(idProject => idProject.id == id);
  
  if(!project){
    return res.status(400).json({ message: "Id User Not Exist" })
  }
  return next();
}

app.post('/projects', checkReqs, (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: []
  });
  return res.json(projects)
})

app.get('/projects', checkReqs, (req, res) => {
  return res.json(projects)
})

app.put('/projects/:id', checkReqs, checkIdExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(idProject => idProject.id == id);

  project.title = title;

  return res.json(project);
});

app.delete('/projects/:id', checkReqs, checkIdExist, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);
  return res.json(projects)
});

app.post('/projects/:id/tasks', checkReqs, checkIdExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(idProject => idProject.id == id);

  project.tasks.push(title);

  return res.json(project);
});


app.listen(3000);