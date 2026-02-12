import { DataSource } from 'typeorm';
import 'dotenv/config';

export const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'docker',
    database: process.env.DB_NAME || 'gobarber',
    synchronize: true,
    logging: false,
    entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
});

export const MongoDataSource = new DataSource({
    type: 'mongodb',
    host: process.env.MONGO_HOST || 'localhost',
    port: Number(process.env.MONGO_PORT) || 27017,
    database: process.env.MONGO_NAME || 'gobarber',
    synchronize: true,
    logging: true,
    entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
});
