import { poolHandler } from "./connection.js";





class mysqlCRUDClass{

    //Devuelve Toda la Tabla
    async getAllData(server= "localhost", database, table){
        try {
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`SELECT * from ${table}`);
            return data[0]
        } catch (error) {
            console.log("Error en getAllData");
        }
    }

    //Devuelve la respuesta ed una QUERY personalizada
    async getData(server= "localhost", database, query){
        try {
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(query);
            return data[0]
        } catch (error) {
            console.log("Error en getData");
            console.log(error);
            
        }
    }
    

    //Crea una Tabla
    async createTable(server = "localhost", database, table){
        try {
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`
                CREATE TABLE IF NOT EXISTS \`${database}\`.\`${table}\` (
                \`id\` INT NOT NULL AUTO_INCREMENT,
                \`name\` VARCHAR(20) NOT NULL,
                \`lastname\` VARCHAR(20),
                \`dni\` INT,
                \`birth\` DATE,
                \`social_security\` VARCHAR(30),
                \`social_security_number\` int,
                \`gender\` BINARY,
                PRIMARY KEY (\`id\`)
            )
                `);
                
            
        } catch (error) {
            console.log("Error en createTable: ", error.sqlMessage);
        }
    }


    //Agregar Columna a una Tabla
    async createTable(server = "localhost", database, table, column, type = "VARCHAR(15)"){
        try {
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`
                ALTER TABLE  \`${database}\`.\`${table}\` 
                ADD COLUMN \`${column}\` ${type} NULL

                `);
                
            
        } catch (error) {
            console.log("Error en createTable: ", error.sqlMessage);
        }
    }


    //Crea Base de Datos
    async createDatabase(server = "localhost", database){
        try {
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`CREATE SCHEMA \`${database}\` DEFAULT CHARACTER SET latin1 ;
                `);
                
            
        } catch (error) {
            console.log("Error en createDatabase: ", error.sqlMessage);
        }
    }


}

const mysqlCRUD = new mysqlCRUDClass()

//Testeo
const test = async ()=>{

    //Inhibicion de Testeo
    if(0){
    
        //Traigo Toda la Tabla
        const data1 = await mysqlCRUD.getAllData("localhost", "world", "city")
        console.log(data1);

        //Traigo data personalizada
        let query = 'SELECT * from city WHERE District = "Buenos Aires"'
        const data = await mysqlCRUD.getData("localhost", "world", query)
        console.log(data);
        
        //Crear Tabla 
        await mysqlCRUD.createTable("localhost", "world", "prueba1")
        
        
    }
    
    
    //Traigo data personalizada
    let query = `
                SELECT * 
                FROM pacientes 
                WHERE name LIKE "%ra%" AND dni LIKE '34%'
                `
    const data = await mysqlCRUD.getData("localhost", "medicalform", query)
    console.log(data);
        
}    

//test()