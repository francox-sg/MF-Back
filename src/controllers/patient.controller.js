import { mysqlPatientCRUD } from "../mysql/patient.dao.js";
import { dateFrontToBack, dateBackToFront } from "../utils/DateConverter.js";

class patientControllerClass{
    
    //Obtener todos los pacientes
    async getAllPatients(req, res){
        
        let patients = await mysqlPatientCRUD.getAllPatients()
        
        
        if(patients == null){
            return res.json({data: null, msj: "Error al intentar obtener los Pacientes"})
        }

        //Parseo de Fechas 
        patients.forEach(patient => {
            patient.birth && (patient.birth = dateBackToFront(patient.birth))
        });
        return res.json({data: patients, msj: "Transaccion Exitosa"})

    }
    
    //Obtener Paciente por dni
    async getPatientByDni(req, res){
        const {dni} = req.params
        
        if(!dni){
            return res.json({data: null, msj: "Debe indicar dni"})
        }

        let patient = await mysqlPatientCRUD.getPatientByDni(Number(dni))
        
        if(patient == -1){
            return res.json({data: -1, msj: "No se encontro el paciente"})
        }
        if(patient == null){
            return res.json({data: null, msj: "Error al intentar obtener el paciente"})
        }
        //Parseo de Fecha
        patient.birth && (patient.birth = dateBackToFront(patient.birth))

        return res.json({data: patient, msj: "Transaccion Exitosa"})

    }
    
    //Obtener Paciente por ID
    async getPatientById(req, res){
        const {id} = req.params
        
        if(!id){
            return res.json({data: null, msj: "Debe indicar id"})
        }

        let patient = await mysqlPatientCRUD.getPatientById(Number(id))

        if(patient == -1){
            return res.json({data: -1, msj: "No se encontro el paciente"})
        }
        if(patient == null){
            return res.json({data: null, msj: "Error al intentar obtener el paciente"})
        }

        //Parseo de Fecha
        patient.birth && (patient.birth = dateBackToFront(patient.birth))

        return res.json({data: patient, msj: "Transaccion Exitosa"})

    }
    
    //Obtener Paciente por Filtros
    async getPatientByFilters(req, res){
        const {name, lastname, dni} = req.body
        let patients= []
        
        
        if(!name && !lastname && !dni){
            console.log("No hay Filtros, se devuelven todos los pacientes");
            patients = await mysqlPatientCRUD.getAllPatients()
            
            return res.json({data: patients, msj: "Todos los Pacientes, no hay filtros"})
        }

        let filters={}

        name ? filters.name = name : null
        lastname ? filters.lastname = lastname : null
        dni ? filters.dni = dni : null

        

        patients = await mysqlPatientCRUD.getPatientByFilters(filters)
        
        
        if(patients == null){
            return res.json({data: null, msj: "Error al intentar obtener los pacientes filtrados"})
        }

        //Parseo de fecha
        patients.forEach(patient => {
            patient.birth && (patient.birth = dateBackToFront(patient.birth))
        });
        return res.json({data: patients, msj: "Transaccion Exitosa"})

    }

    //Agregar Paciente
    async addPatient(req, res){
        let newPatient = req.body
        
        if(!newPatient.dni || !newPatient.name){
            return res.json({data: null, msj: "Debe indicar dni y nombre"})
        }

        newPatient.birth && (newPatient.birth = dateFrontToBack(newPatient.birth))
        newPatient.gender && (newPatient.gender = String(newPatient.gender))

        const newPatientDB = await mysqlPatientCRUD.addPatient(newPatient)
        
        if(newPatientDB == -1){
            return res.json({data: -1, msj: `Ya existe el paciente con dni ${newPatient.dni}`})
        }
        if(newPatientDB == null){
            return res.json({data: null, msj: "Error al intentar crear el paciente"})
        }

        return res.json({data: newPatientDB, msj: "Transaccion Exitosa"})

    }

    //Modificar Paciente por DNI
    async updatePatientByDni(req, res){
        let newPatient = req.body
        
        if(!newPatient.dni){
            return res.json({data: null, msj: "Debe indicar dni"})
        }

        //Parseo de fecha
        newPatient.birth && (newPatient.birth = dateFrontToBack(newPatient.birth))
        newPatient.gender && (newPatient.gender = String(newPatient.gender))

        let updatedPatientDB = await mysqlPatientCRUD.updatePatientByDni(newPatient)
        
        if(updatedPatientDB == -1){
            return res.json({data: -1, msj: `No existe el paciente con dni ${newPatient.dni}`})
        }
        if(updatedPatientDB == null){
            return res.json({data: null, msj: "Error al intentar actualizar el paciente"})
        }

        //Parseo de Fecha
        updatedPatientDB.birth && (updatedPatientDB.birth = dateBackToFront(updatedPatientDB.birth))

        return res.json({data: updatedPatientDB, msj: "Transaccion Exitosa"})

    }

    //Modificar Paciente por ID
    async updatePatientById(req, res){
        let newPatient = req.body
        
        console.log("UPDATE POR ID ROUTE, new patient es: ", newPatient);
        
        if(!newPatient.id){
            return res.json({data: null, msj: "Debe indicar id"})
        }

        //Parseo de fecha
        newPatient.birth && (newPatient.birth = dateFrontToBack(newPatient.birth))
        newPatient.gender && (newPatient.gender = String(newPatient.gender))

        let updatedPatientDB = await mysqlPatientCRUD.updatePatientById(newPatient)
        
        if(updatedPatientDB == -1){
            return res.json({data: -1, msj: `No existe el paciente con ID ${newPatient.id}`})
        }
        if(updatedPatientDB == null){
            return res.json({data: null, msj: "Error al intentar actualizar el paciente"})
        }

        //Parseo de Fecha
        updatedPatientDB.birth && (updatedPatientDB.birth = dateBackToFront(updatedPatientDB.birth))

        return res.json({data: updatedPatientDB, msj: "Transaccion Exitosa"})

    }

    //Borrar Paciente por DNI
    async deletePatientByDni(req, res){
        const {dni} = req.params
        
        if(!dni){
            return res.json({data: null, msj: "Debe indicar dni"})
        }

        const deletedPatientDB = await mysqlPatientCRUD.deletePatientByDni(dni)
        
        if(deletedPatientDB == -1){
            return res.json({data: -1, msj: `No existe el paciente con dni ${dni}`})
        }
        if(deletedPatientDB == null){
            return res.json({data: null, msj: "Error al intentar eliminar el paciente"})
        }

        return res.json({data: deletedPatientDB, msj: "Transaccion Exitosa"})

    }


}

export const patientController = new patientControllerClass()