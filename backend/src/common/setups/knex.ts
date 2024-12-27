import knex from 'knex';

export const knexInstance = knex({
  client: 'mysql',
  connection: {
    host: process.env.CS_DB_HOST,
    port: Number(process.env.CS_DB_PORT),
    user: process.env.CS_DB_USER,
    password: process.env.CS_DB_PASSWORD,
    database: process.env.CS_DB_NAME,
  },
});
