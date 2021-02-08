import { Router } from 'express';

import CharController from './app/controllers/CharController';
import logRequestsMiddleware from './app/middleWares/logRequests';

const routes = new Router();

routes.use(logRequestsMiddleware);
routes.get('/characters', CharController.index);
routes.get('/characters/char/:name', CharController.show);
export default routes;
