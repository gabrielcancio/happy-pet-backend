import jwt from 'jsonwebtoken';
import path from 'path';
import * as dotenv from 'dotenv';
import generateToken from '../../src/utils/generateToken';

dotenv.config({
    path: path.resolve(__dirname, '..', '.env')
})

describe('JWT', () => {
    it('Should be abe to generate a jwt', () => {
        const data = {
            user: 'Gabriel',
            id: '5415464646'
        }

        const token = generateToken(data);
        const compareToken = jwt.sign(data, 'authhappypet');


        expect(typeof(token)).toBe("string");
        expect(token).toBe(compareToken);

    });
});