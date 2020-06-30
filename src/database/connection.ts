import knex from 'knex';

interface IConfig {
    delopment: object;
    test: object;
}

const config: IConfig = require('../../knexfile');


const connection = knex(process.env.NODE_ENV === 'test' ? config.test : config.delopment);

 export default connection;