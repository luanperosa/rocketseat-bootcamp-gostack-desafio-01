const express = require('express');

const app = express();

const projects = [{
  id: 0,
  title: "Easy Hair",
  tasks: ["Deploy"]
}];

app.use(express.json())

function checkIdExist(req, res, next) {
  const { id } = req.params;
  const project = projects.find(idProjets => idProjets.id === id)

  if(!project){
    return res.status(400).json({ message: "Id User Not Exist" })
  }
  return next();
}

app.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: []
  });
  return res.json(projects)
})

app.get('/projects', (req, res) => {
  return res.json(projects)
})

app.put('/projects/:id', checkIdExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
   
  const project = projects.find(idProjets => idProjets.id === id)
  
  projects[id].title = project.title = title;
  
  return res.json(projects[id])
});

app.delete('/projects/:id', checkIdExist, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);
  return res.json(projects)
});

app.post('/projects/:id/tasks', checkIdExist, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = projects.find(idProjets => idProjets.id === id)
  projects[0].tasks.push(title)
  return res.json(projects)

});


app.listen(3000);