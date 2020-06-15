import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
    // client: 'mysql',
    // connection: {
    //     host : '127.0.0.1',
    //     user : 'your_database_user',
    //     password : 'your_database_password',
    //     database : 'myapp_test'
    // }

})

export default connection;