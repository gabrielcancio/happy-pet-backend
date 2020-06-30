import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('consumer_logs', (table) => {
        table.uuid('id').notNullable();
        
        table.string('log').notNullable();
        table.uuid('consumer_id').notNullable();
        
        table.foreign('consumer_id').references('id').inTable('consumers');

        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('consumer_logs');
}