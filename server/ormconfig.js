module.exports = [
  {
    name: 'development',
    type: 'postgres',
    url: 'postgres://postgres:postgres@localhost:5432/testslack',
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    logging: false,
    entities: ['dist/entity/**/*.js'],
    migrations: ['dist/migration/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
    cli: {
      entitiesDir: 'dist/entity',
      migrationsDir: 'dist/migration',
      subscribersDir: 'dist/subscriber',
    },
    // entities: ['src/entity/**/*.ts'],
    // migrations: ['src/migration/**/*.ts'],
    // subscribers: ['src/subscriber/**/*.ts'],
    // cli: {
    //   entitiesDir: 'src/entity',
    //   migrationsDir: 'src/migration',
    //   subscribersDir: 'src/subscriber',
    // },
  },
  {
    name: 'production',
    type: 'postgres',
    url: process.env.PSQL_URL,
    synchronize: false, // switch this to false once you have the initial tables created and use migrations instead
    logging: false,
    entities: ['./entity/**/*.js'],
    migrations: ['./migration/**/*.js'],
    subscribers: ['./subscriber/**/*.js'],
    cli: {
      entitiesDir: './entity',
      migrationsDir: './migration',
      subscribersDir: './subscriber',
    },
    // entities: ['src/entity/**/*.ts'],
    // migrations: ['src/migration/**/*.ts'],
    // subscribers: ['src/subscriber/**/*.ts'],
    // cli: {
    //   entitiesDir: 'src/entity',
    //   migrationsDir: 'src/migration',
    //   subscribersDir: 'src/subscriber',
    // },
  },
];
