const express = require('express');

const app = express();

const projects = [];

app.use(express.json())

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

app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
   
  const project = projects.find(idProject => id === id);
  
  projects[id].title = project.title = title;
  
  return res.json(projects[id])
});

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);
  return res.json(projects)
})


app.listen(3000);