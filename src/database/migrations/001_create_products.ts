import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('products', (table) => {
        table.uuid('id').primary();

        table.string('name').notNullable();
        table.string('image').notNullable();
        table.string('price').notNullable();
        table.string('stock').notNullable();
        table.string('category').notNullable();
        table.string('description').notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        table.uuid('comapany_id').notNullable();

        table.foreign('comapany_id').references('id').inTable('companies');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('products');
}