import { PostgresDataSource, MongoDataSource } from './data-sources';

PostgresDataSource.initialize()
    .then(() => {
        console.log('📦 Postgres Data Source has been initialized!');
    })
    .catch(err => {
        console.error('Error during Postgres Data Source initialization', err);
    });

MongoDataSource.initialize()
    .then(() => {
        console.log('🍃 Mongo Data Source has been initialized!');
    })
    .catch(err => {
        console.error('Error during Mongo Data Source initialization', err);
    });

