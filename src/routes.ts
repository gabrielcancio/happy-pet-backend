import { Router } from 'express';

import authMiddleware from './middleware/auth';

import SessionController from './controllers/SessionController';
import ProductController from './controllers/ProductController';
import CompanyController from './controllers/CompanyController';
import ConsumerController from './controllers/ConsumerController';

const routes = Router();

routes.post('/sessions', SessionController.create);
routes.post('/register/company', CompanyController.create);
routes.post('/register/consumer', ConsumerController.create);

routes.use(authMiddleware);

routes.post('/products', ProductController.create);
routes.get('/products', ProductController.index);

export default routes;