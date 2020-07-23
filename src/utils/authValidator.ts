import jwt from 'jsonwebtoken';
import { promisify } from 'util';

interface IDecoded {
    id: string;
}

async function authValidator(authHeader: string) {
    if(!authHeader) {
        // return response.status(401).json({ message: 'Token not provide' });
        return false
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded: IDecoded = await promisify(jwt.verify)(token, process.env.APP_SECRET || 'authhappypet') as IDecoded;

        return decoded.id;
        
    } catch (err) {
        return false;
    }

}

export default authValidator;