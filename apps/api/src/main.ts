import * as express from 'express';
import {projectsRoutes} from "./app/projects";

const app = express();

projectsRoutes(app);


const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
