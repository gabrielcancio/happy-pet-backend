import request from 'supertest';
import faker from 'faker';

import app from '../../src/app';
import connection from '../../src/database/connection';
import generateUUID from '../../src/utils/generateUUID';
import generatePasswordhash from '../../src/utils/generatePasswordHash';
import generateToken from '../../src/utils/generateToken';

describe('Company', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    
    afterAll(async () => {
        await connection.destroy();
    });

    it('Should be able to create a new company user account', async () => {
        const user = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }

        const response = await request(app)
          .post('/register/company')
          .send(user);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('name');
    });
});