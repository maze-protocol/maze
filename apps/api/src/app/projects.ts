import { Express } from 'express';
import {Project} from "../../../../libs/api-interfaces/src";
import {db} from "./db";

export function projectsRoutes(app: Express) {
  app.get('/api/v1/projects', (req, res) => {
    const projects : Array<Project> = db.getData('/projects');
    res.send(projects);
  });
  app.get('/api/v1/projects/:projectId', (req, res) => {
    const id = db.getIndex('/projects', req.params.projectId);
    const project: Project = db.getData(`/projects[${id}]`);
    res.send(project);
  });
  app.post('/api/v1/projects', (req, res) => {
    const id = db.count('/projects');
    const project : Project = {
      ...req.body,
      id: id
    };
    db.push('/projects', project, true);
    res.send(project);
  });
}
