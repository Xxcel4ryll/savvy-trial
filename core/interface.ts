interface IDatabaseConfigAttributes {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number | string;
  dialect: string;
  urlDatabase?: string;
  timezone?: string;
  logging?: boolean;
}

export default interface IDatabaseConfig {
  database: IDatabaseConfigAttributes;
  port: string | number;
  appEnv: string | number;
}
