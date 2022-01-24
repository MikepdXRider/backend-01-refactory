const fs = require('fs').promises;

// Why is this in it's own file?
module.exports = (pool) => {
  return fs
    .readFile(`${__dirname}/../sql/setup.sql`, { encoding: 'utf-8' })
    .then((sql) => pool.query(sql))
    .then(() => console.log('✅ Database setup complete!'))
    .catch((error) =>
      console.error('❌  Error setting up database:', error.message)
    );
};
