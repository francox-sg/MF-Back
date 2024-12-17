import { poolHandler } from "./connection.js";





/* -------------------------------------------------------------------------- */
/*                                CRUD SocialSecurity                               */
/* -------------------------------------------------------------------------- */


class mysqlSocialSecurityCRUDClass{

    //Buscar Todos los SocialSecuritys
    async getAllSocialSecuritys(server = "localhost", database="medicalform"){
        try {
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`SELECT * from social_security `);
            return data[0]
            
        } catch (error) {
            console.log("Error en getSocialSecurityByname: ", error.sqlMessage);
            return null
        }
    }

    //Buscar SocialSecurity por nombre
    async getSocialSecurityByName(name, server = "localhost", database="medicalform"){
        if(!name){
            console.log("Debe indicar un nombre de Obra Social");
            return null
        }

        try {
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`SELECT * from social_security WHERE name = "${name}"`);

            if(data[0][0] == undefined){
                console.log("No se encontro el SocialSecurity");
                return -1
            }
            return data[0][0]
            
        } catch (error) {
            console.log("Error en getSocialSecurityByName: ", error.sqlMessage);
            return null
        }
    }

    //Agregar SocialSecurity 
    async addSocialSecurity(SocialSecurityData, server= "localhost", database="medicalform", table="social_security" ){

        if(!SocialSecurityData.name){
            console.log("Debe indicar minimamente el nombre");
            return null
        }

        //Armo query con los campos existentes
        let campos = ''
        let valores= ''
        
        let keys = Object.keys(SocialSecurityData) //Devuelve las claves del objeto en un array

        keys.forEach(key => {
            if(SocialSecurityData[key]){
                if(campos != ''){
                    campos    += ", "
                    valores    += ", "
                }
                campos    += ` ${key}`
                valores    += ` '${SocialSecurityData[key]}'`
            }                
        });

        console.log({campos});
        console.log({valores});
        

        try {
            const pool = poolHandler(server, database)

            //Existe ese SocialSecurity?
            const SocialSecurityDB = await this.getSocialSecurityByName(SocialSecurityData.name) 

            if(SocialSecurityDB != -1 && SocialSecurityDB != null){
                console.log("Ya existe un SocialSecurity con name ", SocialSecurityData.name);
                return -1
            }

            //Creo SocialSecurity

            const data = await pool.promise().execute(`
                INSERT INTO ${table} (${campos})
                VALUES (${valores});
                `);
            console.log("Se creó el nuevo SocialSecurity con name: ", SocialSecurityData.name);
            
            const newSocialSecurityDB = await this.getSocialSecurityByName(SocialSecurityData.name) 
            return newSocialSecurityDB

        } catch (error) {
            console.log("Error en addSocialSecurity: ", error.sqlMessage);
            console.log(error);
            
            return null
        }
    }


    //Actualizar SocialSecurity por name
    async updateSocialSecurityByname(SocialSecurityData, server = "localhost", database="medicalform"){

        if(!SocialSecurityData.name){
            console.log("Debe indicar un name valido:", SocialSecurityData.name);
            return null
        }

        try {
            //Existencia de ese SocialSecurity
            const SocialSecurityDB = await this.getSocialSecurityByName(SocialSecurityData.name)
            
            if(SocialSecurityDB == -1){
                console.log("No existe el SocialSecurity ", SocialSecurityData.name);
                return -1
            }

            //Valores a actualizar
            let updates = ''
            let keys = Object.keys(SocialSecurityData) //Devuelve las claves del objeto en un array

            keys.forEach(key => {
                if(SocialSecurityData[key]){
                    if(updates.length != 0){
                        updates    += ", "
                    }
                    updates    += `${key} = '${SocialSecurityData[key]}'`
                }                
            });
            
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`update social_security SET ${updates} WHERE name = "${SocialSecurityData.name}"`);
            
            const newSocialSecurityDB = await this.getSocialSecurityByName(SocialSecurityData.name) 
            return newSocialSecurityDB
            
        } catch (error) {
            console.log("Error en updateSocialSecurityByname: ", error.sqlMessage);
            console.log(error);
            return null
            
        }
    }

    //Borrar SocialSecurity por name
    async deleteSocialSecurityByname(name, server = "localhost", database="medicalform"){

        if(!name){
            console.log("Debe indicar un name valido:", SocialSecurityData.name);
            return null
        }

        try {
            //Existencia de ese SocialSecurity
            const SocialSecurityDB = await this.getSocialSecurityByName(name)
            
            if(SocialSecurityDB == -1){
                console.log("No existe el SocialSecurity ", name);
                return -1
            }

            //Borrado
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`delete from social_security  WHERE name = "${name}"`);
            return 1
            
        } catch (error) {
            console.log("Error en updateSocialSecurityByname: ", error.sqlMessage);
            return null
            
        }
    }


}



export const mysqlSocialSecurityCRUD = new mysqlSocialSecurityCRUDClass();






/* ---------------------------------- TESTS --------------------------------- */


const test = async ()=>{

    //Inhibicion de Testeo
    if(0){
    


        //Agregar SocialSecurity
        const SocialSecurityData={
            name: "IOMA",
            description: "Instituto de Obra Medico Asistencial",
            code: "00100"
        }
        await mysqlSocialSecurityCRUD.addSocialSecurity(SocialSecurityData)


        //Get SocialSecurity por name
        let SocialSecurityPrueba =  await mysqlSocialSecurityCRUD.getSocialSecurityByName("IOMA")
        console.log(SocialSecurityPrueba);


        //Actuaizar SocialSecurity
        const SocialSecurityData2={
            name: "IOMA",
            description: "Instituto de Obra Medico Asistencial",
            code: "11011"
        }
        await mysqlSocialSecurityCRUD.updateSocialSecurityByname(SocialSecurityData2)

    //Borrar SocialSecurity por name
    await mysqlSocialSecurityCRUD.deleteSocialSecurityByname("IOMA")

        
    }

    //Tests Activos


//Get SocialSecurity por name
let SocialSecurityPrueba =  await mysqlSocialSecurityCRUD.getSocialSecurityByName("IOMA")
console.log(SocialSecurityPrueba);

}    

//test()