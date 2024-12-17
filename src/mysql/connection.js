import {createPool} from 'mysql2'

//Manejador de Conexiones

let sqlPools=[]

export const poolHandler = (server = "localhost", database) =>{

    const existePool = sqlPools.find(pool => {return pool.server === server && pool.database === database})

    if(existePool){
        return existePool.pool;
    }

    const pool = createPool({
        host     : server,
        user     : 'root',
        password : 'franquito',
        port : 3306,
        database: database
    });

    sqlPools.push({server, database, pool})
    
    
    return pool
}


