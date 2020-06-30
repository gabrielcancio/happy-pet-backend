import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('companies_logs', (table) => {
        table.uuid('id').notNullable();
        
        table.string('log').notNullable();
        table.uuid('company_id').notNullable();
        
        table.foreign('company_id').references('id').inTable('companies');

        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('companies_logs');
}