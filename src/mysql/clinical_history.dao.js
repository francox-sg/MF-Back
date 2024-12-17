import { poolHandler } from "./connection.js";





/* -------------------------------------------------------------------------- */
/*                                CRUD ClinicalHistory                               */
/* -------------------------------------------------------------------------- */


class mysqlClinicalHistoryCRUDClass{

    //Buscar Todos los ClinicalHistorys
    async getAllClinicalHistorys(server = "localhost", database="medicalform"){
        try {
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`SELECT * from clinical_history `);
            return data[0]
            
        } catch (error) {
            console.log("Error en getClinicalHistoryByname: ", error.sqlMessage);
            return null
        }
    }

    //Buscar ClinicalHistory por ID 
    async getClinicalHistoryById(id, server = "localhost", database="medicalform"){
        if(!id){
            console.log("Debe indicar un id");
            return null
        }

        try {
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`SELECT * from clinical_history WHERE id = "${id}"`);

            if(data[0][0] == undefined){
                console.log("No se encontro la Historia Clinica con id: ", id);
                return -1
            }
            return data[0][0]
            
        } catch (error) {
            console.log("Error en getClinicalHistoryByID: ", error.sqlMessage);
            return null
        }
    }
    //Buscar ClinicalHistory por ID de Paciente
    async getClinicalHistoryByPatientId(patient_id, server = "localhost", database="medicalform"){
        if(!patient_id){
            console.log("Debe indicar un patient_id");
            return null
        }

        try {
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`SELECT * from clinical_history WHERE patient_id = "${patient_id}"`);

            if(data[0][0] == undefined){
                console.log("No se encontro la Historia Clinica");
                return -1
            }
            return data[0]
            
        } catch (error) {
            console.log("Error en getClinicalHistoryByName: ", error.sqlMessage);
            return null
        }
    }

    //Agregar ClinicalHistory 
    async addClinicalHistory(ClinicalHistoryData, server= "localhost", database="medicalform", table="clinical_history" ){

        if(!ClinicalHistoryData.patient_id){
            console.log("Debe indicar minimamente el patient_id");
            return null
        }

        //Armo query con los campos existentes
        let campos = ''
        let valores= ''
        
        let keys = Object.keys(ClinicalHistoryData) //Devuelve las claves del objeto en un array

        keys.forEach(key => {
            if(ClinicalHistoryData[key]){
                if(campos != ''){
                    campos    += ", "
                    valores    += ", "
                }
                campos    += ` ${key}`
                valores    += ` '${ClinicalHistoryData[key]}'`
            }                
        });

        console.log({campos});
        console.log({valores});
        

        try {
            const pool = poolHandler(server, database)

            //Creo ClinicalHistory

            const data = await pool.promise().execute(`
                INSERT INTO ${table} (${campos})
                VALUES (${valores});
                `);
            console.log("Se creó el nuevo ClinicalHistory con patient_id: ", ClinicalHistoryData.patient_id);
            
            const newClinicalHistoryDB = await this.getClinicalHistoryByPatientId(ClinicalHistoryData.patient_id) 
            return newClinicalHistoryDB

        } catch (error) {
            console.log("Error en addClinicalHistory: ", error.sqlMessage);
            console.log(error);
            
            return null
        }
    }


    //Actualizar ClinicalHistory por ID
    async updateClinicalHistoryById(ClinicalHistoryData, server = "localhost", database="medicalform"){

        if(!ClinicalHistoryData.id){
            console.log("Debe indicar un id valido:", ClinicalHistoryData.id);
            return null
        }

        try {
            //Existencia de ese ClinicalHistory
            const ClinicalHistoryDB = await this.getClinicalHistoryById(ClinicalHistoryData.id)
            
            if(ClinicalHistoryDB == -1){
                console.log("No existe el ClinicalHistory con id ", ClinicalHistoryData.id);
                return -1
            }

            //Valores a actualizar
            let updates = ''
            let keys = Object.keys(ClinicalHistoryData) //Devuelve las claves del objeto en un array

            keys.forEach(key => {
                if(ClinicalHistoryData[key]){
                    if(updates.length != 0){
                        updates    += ", "
                    }
                    updates    += `${key} = '${ClinicalHistoryData[key]}'`
                }                
            });
            
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`update clinical_history SET ${updates} WHERE id = "${ClinicalHistoryData.id}"`);
            
            const newClinicalHistoryDB = await this.getClinicalHistoryById(ClinicalHistoryData.id) 
            return newClinicalHistoryDB
            
        } catch (error) {
            console.log("Error en updateClinicalHistoryById: ", error.sqlMessage);
            console.log(error);
            return null
            
        }
    }

    //Borrar ClinicalHistory por Id
    async deleteClinicalHistoryById(id, server = "localhost", database="medicalform"){

        if(!id){
            console.log("Debe indicar un id valido:", ClinicalHistoryData.id);
            return null
        }

        try {
            //Existencia de ese ClinicalHistory
            const ClinicalHistoryDB = await this.getClinicalHistoryById(id)
            
            if(ClinicalHistoryDB == -1){
                console.log("No existe el ClinicalHistory con id: ", id);
                return -1
            }

            //Borrado
            const pool = poolHandler(server, database)
            const data = await pool.promise().execute(`delete from clinical_history  WHERE id = "${id}"`);
            return 1
            
        } catch (error) {
            console.log("Error en updateClinicalHistoryByname: ", error.sqlMessage);
            return null
            
        }
    }


}



export const mysqlClinicalHistoryCRUD = new mysqlClinicalHistoryCRUDClass();






/* ---------------------------------- TESTS --------------------------------- */
const formatearFecha = ()=>{
    // Obtener la fecha actual
    let fecha = new Date();

    // Obtener el año, mes y día
    let año = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;  // Los meses son base 0, por eso sumamos 1
    let dia = fecha.getDate();

    // Asegurarse de que el mes y el día tengan dos dígitos (por ejemplo, 09 en lugar de 9)
    mes = mes < 10 ? '0' + mes : mes;
    dia = dia < 10 ? '0' + dia : dia;

    // Formatear la fecha como YYYY-MM-DD
    let fechaFormateada = `${año}-${mes}-${dia}`;
    return fechaFormateada
}


const test = async ()=>{

    //Inhibicion de Testeo
    if(0){
        
        //Get All ClinicalHistory
        let ClinicalHistoryPrueba3 =  await mysqlClinicalHistoryCRUD.getAllClinicalHistorys()
        console.log(ClinicalHistoryPrueba3);

        //Get ClinicalHistory por id
        let ClinicalHistoryPrueba =  await mysqlClinicalHistoryCRUD.getClinicalHistoryById(2)
        console.log(ClinicalHistoryPrueba);

        //Get ClinicalHistory por PatientId
        let ClinicalHistoryPrueba2 =  await mysqlClinicalHistoryCRUD.getClinicalHistoryByPatientId(1)
        console.log(ClinicalHistoryPrueba2);
        
        //Agregar ClinicalHistory
        const ClinicalHistoryData={
            patient_id: 1,
            description: "Paciente con diagnostico bla bla Patient 1",
            date: formatearFecha(),
            type: 1 //0= Consulta, 1 = Intervecion
        }
        await mysqlClinicalHistoryCRUD.addClinicalHistory(ClinicalHistoryData)

        
        //Actualizar ClinicalHistory
        const ClinicalHistoryData4={
            id:4,
            patient_id: 1,
            description: "Paciente con diagnostico bla bla Patient 1 Actualizada",
            type: 1 //0= Consulta, 1 = Intervecion
        }
        const respuesta = await mysqlClinicalHistoryCRUD.updateClinicalHistoryById(ClinicalHistoryData4)
        console.log(respuesta);

        //Borrar ClinicalHistory por Id
        await mysqlClinicalHistoryCRUD.deleteClinicalHistoryById(4)

        
    }

    //Tests Activos


    

    

//Get All ClinicalHistory
let ClinicalHistoryPrueba3 =  await mysqlClinicalHistoryCRUD.getAllClinicalHistorys()
console.log(ClinicalHistoryPrueba3);




}    

//test()

