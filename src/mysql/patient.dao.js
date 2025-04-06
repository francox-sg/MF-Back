import { poolHandler } from "./connection.js";





/* -------------------------------------------------------------------------- */
/*                                CRUD PACIENTE                               */
/* -------------------------------------------------------------------------- */


class mysqlPatientCRUDClass{

    //Buscar Todos los Pacientes
    async getAllPatients(server = "localhost", database="medicalform"){
        try {
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`SELECT * from pacientes `);
            return data[0]
            
        } catch (error) {
            /* console.log("Error en getPatientByDni: ", error.sqlMessage); */
            return null
        }
    }

    //Buscar Paciente por DNI
    async getPatientByDni(dni, server = "localhost", database="medicalform"){
        if(!dni){
            console.log("Debe indicar un dni");
            return null
        }

        try {
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`SELECT * from pacientes WHERE dni = ${dni}`);

            if(data[0][0] == undefined){
                console.log("No se encontro el paciente");
                return -1
            }
            return data[0][0]
            
        } catch (error) {
            console.log("Error en getPatientByDni: ", error.sqlMessage);
            return null
        }
    }

    //Buscar Paciente por ID
    async getPatientById(id, server = "localhost", database="medicalform"){
        if(!id){
            console.log("Debe indicar un id");
            return null
        }

        try {
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`SELECT * from pacientes WHERE id = ${id}`);

            if(data[0][0] == undefined){
                console.log("No se encontro el paciente");
                return -1
            }
            return data[0][0]
            
        } catch (error) {
            console.log("Error en getPatientById: ", error.sqlMessage);
            return null
        }
    }

    //Buscar Paciente por Filtros
    async getPatientByFilters(filters= null, server = "localhost", database="medicalform"){
        let patientsDB =[]

        if(filters == null){
            //console.log("Pacientes Sin Filtros");
            
            patientsDB = await this.getAllPatients()
            return patientsDB
        }

        try {
            const pool = poolHandler(server, database)
            
            let algunFiltro=false;
            let query= "Select * from pacientes where "

            for(let key in filters){
                if(algunFiltro == true){
                    query += `AND ${key} LIKE "${key=="dni" ? "" : "%"}${filters[key]}%" `
                }else{
                    query += `${key} LIKE "${key=="dni" ? "" : "%"}${filters[key]}%" `
                    algunFiltro = true
                }
            }
            //console.log(query);
            

            const data = await pool.promise().execute(query);
            //console.log(data);
            return data[0]
            
/*             if(data[0][0] == undefined){
                console.log("No se encontraron los pacientes");
                return -1
            }
            return data[0][0] */
            
        } catch (error) {
            console.log("Error en getPatientById: ", error.sqlMessage);
            return null
        }
    }

    //Agregar Paciente 
    async addPatient(patientData, server= "localhost", database="medicalform", table="pacientes" ){

        if(!patientData.dni || !patientData.name){
            console.log("Debe indicar minimamente el dni y el nombre");
            return null
        }

        //Armo query con los campos existentes
        let campos = ''
        let valores= ''
        
        let keys = Object.keys(patientData) //Devuelve las claves del objeto en un array

        keys.forEach(key => {
            if(patientData[key]){
                if(campos != ''){
                    campos    += ", "
                    valores    += ", "
                }
                campos    += ` ${key}`
                valores    += ` '${patientData[key]}'`
            }                
        });
        

        try {
            const pool = poolHandler(server, database)

            //Existe ese paciente?
            const pacienteDB = await this.getPatientByDni(patientData.dni) 

            if(pacienteDB != -1 && pacienteDB != null){
                console.log("Ya existe un paciente con DNI ", patientData.dni);
                console.log("Paciente:",pacienteDB);
                
                return -1
            }

            //Creo Paciente
/*             const data = await pool.promise().execute(`
                INSERT INTO ${table} (name, lastname, dni, birth, social_security, social_security_number, gender)
                VALUES ('${patientData.name}', '${patientData.lastname}', '${patientData.dni}', '${patientData.birth}', '${patientData.social_security}', '${patientData.social_security_number}', '${patientData.gender}');
                
                `); */
            const data = await pool.promise().execute(`
                INSERT INTO ${table} (${campos})
                VALUES (${valores});
                `);
            console.log("Se creó el nuevo paciente con dni: ", patientData.dni);
  

            const newDbPatient = await this.getPatientByDni(patientData.dni)
            return newDbPatient
            
            
        } catch (error) {
            console.log("Error en addPatient: ", error.sqlMessage);
            console.log(error);
            
            return null
        }
    }


    //Actualizar Paciente por DNI
    async updatePatientByDni(patientData, server = "localhost", database="medicalform"){

        if(!patientData.dni){
            console.log("Debe indicar un DNI valido:", patientData.dni);
            return null
        }

        try {
            //Existencia de ese paciente
            const pacienteDB = await this.getPatientByDni(patientData.dni)
            
            if(!pacienteDB){
                console.log("No existe el Paciente ", patientData.dni);
                return -1
            }

            //Valores a actualizar
            let updates = ''
            let keys = Object.keys(patientData) //Devuelve las claves del objeto en un array

            keys.forEach(key => {
                if(patientData[key]){
                    if(updates.length != 0){
                        updates    += ", "
                    }
                    updates    += `${key} = '${patientData[key]}'`
                }                
            });
            
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`update pacientes SET ${updates} WHERE dni = ${patientData.dni}`);
            
            const updatedPatient = await this.getPatientByDni(patientData.dni)
            return updatedPatient
            
        } catch (error) {
            console.log("Error en updatePatientByDni: ", error.sqlMessage);
            console.log(error);
            return null
            
        }
    }

    //Actualizar Paciente por ID
    async updatePatientById(patientData, server = "localhost", database="medicalform"){

        if(!patientData.id){
            console.log("Debe indicar un ID valido:", patientData.id);
            return null
        }

        try {
            //Existencia de ese paciente
            const pacienteDB = await this.getPatientById(patientData.id)
            const patientID = patientData.id;

            if(!pacienteDB){
                console.log("No existe el Paciente ", patientData.id);
                return -1
            }

            delete patientData.id

            //Valores a actualizar
            let updates = ''
            let keys = Object.keys(patientData) //Devuelve las claves del objeto en un array

            keys.forEach(key => {
                if(patientData[key]){
                    if(updates.length != 0){
                        updates    += ", "
                    }
                    updates    += `${key} = '${patientData[key]}'`
                }                
            });
            
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`update pacientes SET ${updates} WHERE id = ${patientID}`);
            
            const updatedPatient = await this.getPatientById(patientID)
            return updatedPatient
            
        } catch (error) {
            console.log("Error en updatePatientById: ", error.sqlMessage);
            console.log(error);
            return null
            
        }
    }

    //Borrar Paciente por DNI
    async deletePatientByDni(dni, server = "localhost", database="medicalform"){

        if(!dni){
            console.log("Debe indicar un DNI valido:", patientData.dni);
            return null
        }

        try {
            //Existencia de ese paciente
            const pacienteDB = await this.getPatientByDni(dni)
            console.log({pacienteDB});
            
            if(pacienteDB == -1){
                console.log("No existe el Paciente con dni:  ", dni);
                return -1
            }
            
            
            //Borrado
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`delete from pacientes  WHERE dni = ${dni}`);
            return 1
            
        } catch (error) {
            console.log("Error en updatePatientByDni: ", error.sqlMessage);
            return null
            
        }
    }


}



export const mysqlPatientCRUD = new mysqlPatientCRUDClass();






/* ---------------------------------- TESTS --------------------------------- */


const test = async ()=>{

    //Inhibicion de Testeo
    if(0){
    
        //Traigo Toda la Tabla
        const data1 = await mysqlPatientCRUD.getAllData("localhost", "world", "city")
        console.log(data1);

        //Traigo data personalizada
        let query = 'SELECT * from city WHERE District = "Buenos Aires"'
        const data = await mysqPatientlCRUD.getData("localhost", "world", query)
        console.log(data);
        
        //Crear Tabla 
        await mysqlPatientCRUD.createTable("localhost", "world", "prueba1")

        //Agregar Paciente
        const patientData={
            name: "Franco2",
            lastname: "Galeano2",
            dni: 36273492,
            birth: "1991-08-03",
            social_security: "OSDE",
            social_security_number: 213456754,
            gender: 1
        }
        await mysqlPatientCRUD.addPatient(patientData)


        //Get Paciente por DNI
        await mysqlPatientCRUD.getPatientByDni(36273492)

        //Get Paciente por ID
        let pacientePruebaa = await mysqlPatientCRUD.getPatientById(16)
        console.log(pacientePruebaa);
        
        //Actualizar Paciente
        const patientData2={
            name: "Pepito",
            lastname: "Messi",
            dni: 36273492,
            birth: null,
            social_security: null,
            social_security_number: 213456754,
            gender: 1
        }
    
        await mysqlPatientCRUD.updatePatientByDni(patientData2)

        //Borrar Paciente por DNI
        await mysqlPatientCRUD.deletePatientByDni(36273492)

        
    }

    //Tests Activos

    //Pacient Filtrado
    const filters={
        /* lastname:"a",
        name:"fr", */
        dni: 36
    }

    await mysqlPatientCRUD.getPatientByFilters(filters)



}    

//test()