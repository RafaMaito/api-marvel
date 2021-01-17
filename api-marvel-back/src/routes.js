import { Router } from 'express';

import CharController from './app/controllers/CharController';

const routes = new Router();
routes.get('/characters/:offset', CharController.index);

routes.get('/characters/char/:name', CharController.show);
export default routes;
