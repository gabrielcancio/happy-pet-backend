import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

interface IDecoded {
    id: string;
}

export default async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        return response.status(401).json({ message: 'Token not provide' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded: IDecoded = await promisify(jwt.verify)(token, process.env.APP_SECRET || 'authhappypet') as IDecoded;
        
        return next();
    } catch (err) {
        return response.status(401).json({ message: 'Token invalid' });
    }

}