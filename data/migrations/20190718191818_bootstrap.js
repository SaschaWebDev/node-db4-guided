exports.up = function(knex) {
  // table for zoos, species, animals
  // zoos 1 -- * animals
  // species 1 --- * animals
  return (
    knex.schema
      .createTable('zoos', tbl => {
        tbl.increments();

        tbl
          .string('zoo_name', 128)
          .notNullable()
          .unique();

        tbl
          .string('address', 256)
          .notNullable()
          .unique();
      })
      // Another table can be defined here and the order of creation is enforced sequentially
      .createTable('species', tbl => {
        tbl.increments();

        tbl
          .string('species_name', 128)
          .notNullable()
          .unique();
      })
      .createTable('animals', tbl => {
        tbl.increments();

        tbl.string('animal_name').notNullable();

        tbl
          .integer('species_id')
          .unsigned()
          .notNullable()
          .increments()
          .references('id')
          .inTable('species')
          .onDelete('RESTRICT') // what happens if the species is deleted?
          .onUpdate('CASCADE'); // What happens if the id of the species changes?
      })
  );
};

exports.down = function(knex) {};
