import express, { response } from 'express';
import path from 'path';
import knex from './database/connections';
import PointController from './controllers/PointController';
import ItemController from './controllers/ItemController';

const routes = express();
routes.use(express.json()); //fala para ele entender json no body

const pointController = new PointController();
const itemController = new ItemController();

// index, show, create, update, delete

routes.get('/itens', itemController.index);
routes.post('/points', pointController.create);
routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);

//rota de exibição das imagens
routes.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));


export default routes;