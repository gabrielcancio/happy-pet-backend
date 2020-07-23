import request from 'supertest';

import app from '../../src/app';
import connection from '../../src/database/connection';
import generateUUID from '../../src/utils/generateUUID';
import generatePasswordhash from '../../src/utils/generatePasswordHash';
import generateToken from '../../src/utils/generateToken';

describe('Authentication', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    
    afterAll(async () => {
        await connection.destroy();
    });

    it('Should be able to authenticate with valid credentials', async () => {
        const id = generateUUID();
        const password = '123456';
        const password_hash = await generatePasswordhash(password);

        const user = {
            id,
            name: 'Gabriel Costa',
            email: 'gabriel.cancio02@gmail.com',
            password_hash
        }

        await connection('consumers').insert(user);

        const response = await request(app)
          .post('/sessions')
          .send({
              email: user.email,
              password: '123456'
          });

        expect(response.status).toBe(200);
    });

    it('Should not be able to authenticate with invalid credentials', async () => {
        const id = generateUUID();
        const password = '123456';
        const password_hash = await generatePasswordhash(password);

        const user = {
            id,
            name: 'Gabriel Costa',
            email: 'gabriel.cancio02@gmail.com',
            password_hash
        }

        await connection('consumers').insert(user);

        const response = await request(app)
          .post('/sessions')
          .send({
              email: user.email,
              password: '5697'
          });

        expect(response.status).toBe(401);
    });

    it('Should return a JWT token when autheticated', async () => {
        const id = generateUUID();
        const password = '123456';
        const password_hash = await generatePasswordhash(password);

        const user = {
            id,
            name: 'Gabriel Costa',
            email: 'gabriel.cancio02@gmail.com',
            password_hash
        }

        await connection('consumers').insert(user);

        const response = await request(app)
          .post('/sessions')
          .send({
              email: user.email,
              password: '123456'
          });

        expect(response.body).toHaveProperty('token');
    });

    it('Should be able to acess private rouets when authenticated', async () => {
        const id = generateUUID();
        const password = '123456';
        const password_hash = await generatePasswordhash(password);

        const user = {
            id,
            name: 'Gabriel Costa',
            email: 'gabriel.cancio02@gmail.com',
            password_hash
        }

        await connection('consumers').insert(user);

        const response = await request(app)
          .get('/products')
          .set('Authorization', `Bearer ${generateToken({ id: user.id })}`);

          expect(response.status).toBe(200);
    });

    it('Should not be able to acess private routes when not authenticated', async () => {

        const response = await request(app)
          .get('/products');
          
          expect(response.status).toBe(401);
    });

    it('Should not be able to acess private routes with invalid token', async () => {

        const response = await request(app)
          .get('/products')
          .set('Authorization', `Bearer 1545654664`);
          
          expect(response.status).toBe(401);
    });
});