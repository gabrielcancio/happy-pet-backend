import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('error_logs', (table) => {
        table.uuid('id').notNullable();

        table.string('error').notNullable();

        table.timestamp('created_at').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('error_logs');
}