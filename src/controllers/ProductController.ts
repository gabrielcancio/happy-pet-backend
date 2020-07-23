import { Request, Response } from 'express';

import generateUUID from '../utils/generateUUID';
import connection from '../database/connection';

class ProductController {
    async create(request: Request, response: Response) {
        const { 
            name,
            image,
            price,
            stock,
            category,
            description,
            company_id 

        } = request.body;

        const id = generateUUID();

        const product = {
            id,
            name,
            image,
            price,
            stock,
            category,
            description,
            company_id 
        }

        await connection('products').insert(product);

        return response.status(201).send();
    }

    async index(request: Request, response: Response) {
        return response.status(200).send();
    }
}

export default new ProductController();