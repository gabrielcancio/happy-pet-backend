import { Request, Response } from 'express';
import generateUUID  from '../utils/generateUUID';
import generateToken  from '../utils/generateToken';
import generatePasswordHash  from '../utils/generatePasswordHash';
import connection from '../database/connection';

class CompannyController {
    async create(request: Request, response: Response) {
        const { name, email, password } = request.body;

        const id = generateUUID();
        const password_hash = await generatePasswordHash(password);

        const user = {
            id,
            name,
            email,
            password_hash
        }

        await connection('companies').insert(user);

        return response.status(200).json({
            id,
            name,
            email,
            token: generateToken({ id })
        });
        
    }
}

export default new CompannyController();