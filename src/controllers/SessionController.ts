import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import generateToken from '../../src/utils/generateToken';

import connection from '../database/connection';

interface IConsumer {
    id: string;
    name: string;
    email: string;
    password_hash: string;
}

class SessionController {
    async create(request: Request, response: Response) {
        const { email, password } = request.body;

        const consumer: IConsumer = await connection('consumers')
          .select('*')
          .where('email', email)
          .first();

        const user = {
            id: consumer.id,
            name: consumer.name,
            email: consumer.email
        }

        const compareHash = await bcrypt.compare(password, consumer.password_hash);

          if (!consumer) {
            return response.status(400).json({ error: 'User not found.' });
        } else if (compareHash ==! true) {
            return response.status(401).send();
        }

        return response.status(200).json({
            user,
            token: generateToken({ id: user.id })
        });
    }
}

export default new SessionController();