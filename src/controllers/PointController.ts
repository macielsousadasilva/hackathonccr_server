
import express, { Request, Response } from 'express';
import path from 'path';
import knex from '../database/connections';

const routes = express();
routes.use(express.json()); //fala para ele entender json no body

class PointController {
    async index(req: Request, resp: Response) {
        const { city, uf, itens } = req.query;

        const parsedItens = String(itens).split(',')
            .map(itens => Number(itens.trim()))

        const point = await knex('points')
            .join('points_itens', 'points.id', '=', 'points_itens.point_id')
            .whereIn('points_itens.item_id', parsedItens)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*')

        return resp.json(point)
    }
    async show(req: Request, resp: Response) {
        const { id } = req.params;

        //const point = await knex('points').where('id', id).first();
        //const point = await knex.select('*').from('points').where({ id: id }).first();
        const point = await knex('points').where({ id: id }).first();

        if (!point) {
            return resp.status(400).json({ message: 'Point not found' });
        }

        const itens = await knex('itens')
            .join('points_itens', 'itens.id', '=', 'points_itens.item_id')
            .where('points_itens.point_id', id)
            .select('itens.title');

        return resp.json({ point, itens });
    }
    async create(req: Request, resp: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            itens
        } = req.body;

        //se der erro na primeira os outros não insere
        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };

        const point_id = (await trx.insert(point).into("points"))[0];


        const pointItens = itens.map((item_id: number) => {
            return {
                item_id,
                point_id,
            }
        })
        await trx.insert(pointItens).into("points_itens");

        await trx.commit();

        return resp.json({
            id: point_id,
            ...point,
        });



    }

}

export default PointController;