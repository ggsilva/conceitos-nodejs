const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const indexRepository = repositories.findIndex(r => {
    return r.id === id;
  });

  if (indexRepository < 1)
    return response.status(400).send();

  const { likes } = repositories[indexRepository];

  repositories[indexRepository] = {
    id, url, title, techs, likes
  };

  return response.status(200).json(repositories[indexRepository]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const indexRepository = repositories.findIndex(r => {
    return r.id === id;
  });

  if (indexRepository < 1)
    return response.status(400).send();

  repositories.splice(indexRepository, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const indexRepository = repositories.findIndex(r => {
    return r.id === id;
  });

  if (indexRepository < 0)
    return response.status(400).send();

  const { likes } = repositories[indexRepository];

  repositories[indexRepository].likes++;

  return response.status(200).json(repositories[indexRepository]);
});

module.exports = app;
