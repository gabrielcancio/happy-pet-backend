import request from 'supertest';
import faker from 'faker';

import app from '../../src/app';
import connection from '../../src/database/connection';

describe('Product', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    
    afterAll(async () => {
        await connection.destroy();
    });

    it('Should be able to create a new product', async () => {
        const user = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }

        const createCompanyResponse = await request(app)
          .post('/register/company')
          .send(user);

          console.log(createCompanyResponse.body)
                  
        const product = {
            name: 'Test product',
            image: 'test',
            price: 12,
            stock: 5,
            category: 'Cat',
            description: 'Test description',
            company_id: createCompanyResponse.body.id
        }

        const response = await request(app)
          .post('/products')
          .set('Authorization', createCompanyResponse.body.token)
          .send(product);

        expect(response.status).toBe(201);
        
        });
});