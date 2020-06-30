import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('consumers', (table) => {
        table.uuid('id').notNullable().primary();

        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password_hash').notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('consumers');
}