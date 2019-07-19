module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true, // needed for sqlite
    connection: {
      filename: './data/zoos.db3',
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    // SQLite does not enforce foreign keys by default, ADD THIS!
    pool: {
      afterCreate: (conn, done) => {
        // runs after connection is made to database
        // done function has to be called when stuff is done
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },
};
