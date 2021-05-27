module.exports = [
  {
    name: "development",
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  },
  {
    name: "production",
    type: "postgres",
    url: "postgres://postgres:1234@localhost:5432/slack",
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    logging: false,
    // entities: ["dist/entity/**/*.js"],
    // migrations: ["dist/migration/**/*.js"],
    // subscribers: ["dist/subscriber/**/*.js"],
    // cli: {
    //   entitiesDir: "dist/entity",
    //   migrationsDir: "dist/migration",
    //   subscribersDir: "dist/subscriber",
    // },
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  },
];
