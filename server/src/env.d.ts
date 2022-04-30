declare namespace NodeJS {
  export interface ProcessEnv {
    SECRET1: string;
    SECRET2: string;
    REDIS_DOMAIN: string;
    REDIS_PORT: string;
    PSQL_URL:string;
  }
}
