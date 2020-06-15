
import express, { Request, Response } from 'express';
import path from 'path';
import knex from '../database/connections';
import config from '../config';

class ItemController {
    async index(req: Request, resp: Response) {
        const itens = await knex('itens').select('*');//faz um select no sqlite
        const serializesItens = itens.map(itens => {
            return {
                id: itens.id,
                title: itens.title,
                image_url: `${config.BASE_URL}:${config.BASE_PORT}/uploads/${itens.image}`,
            }
        })
        return resp.json(serializesItens);
    }
}

export default ItemController;