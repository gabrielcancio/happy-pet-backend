import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('companies', (table) => {
        table.uuid('id').primary();
        table.string('name').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('password_hash').notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('companies');
}