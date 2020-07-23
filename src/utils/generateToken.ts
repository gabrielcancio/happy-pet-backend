import jwt from 'jsonwebtoken';

function generateToken(data: object) {
    return jwt.sign(data, process.env.APP_SECRET || 'authhappypet') ;
}

export default generateToken;