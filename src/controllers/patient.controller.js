import { mysqlPatientCRUD } from "../mysql/patient.dao.js";

class patientControllerClass{
    
    //Obtener todos los pacientes
    async getAllPatients(req, res){
        
        const patients = await mysqlPatientCRUD.getAllPatients()
        
        if(patients == null){
            return res.json({data: null, msj: "Error al intentar obtener los Pacientes"})
        }
        return res.json({data: patients, msj: "Transaccion Exitosa"})

    }
    
    //Obtener Paciente por dni
    async getPatientByDni(req, res){
        const {dni} = req.params
        
        if(!dni){
            return res.json({data: null, msj: "Debe indicar dni"})
        }

        const patient = await mysqlPatientCRUD.getPatientByDni(Number(dni))
        
        if(patient == -1){
            return res.json({data: -1, msj: "No se encontro el paciente"})
        }
        if(patient == null){
            return res.json({data: null, msj: "Error al intentar obtener el paciente"})
        }

        return res.json({data: patient, msj: "Transaccion Exitosa"})

    }
    
    //Obtener Paciente por ID
    async getPatientById(req, res){
        const {id} = req.params
        
        if(!id){
            return res.json({data: null, msj: "Debe indicar id"})
        }

        const patient = await mysqlPatientCRUD.getPatientById(Number(id))
        
        if(patient == -1){
            return res.json({data: -1, msj: "No se encontro el paciente"})
        }
        if(patient == null){
            return res.json({data: null, msj: "Error al intentar obtener el paciente"})
        }

        return res.json({data: patient, msj: "Transaccion Exitosa"})

    }
    
    //Obtener Paciente por Filtros
    async getPatientByFilters(req, res){
        const {name, lastname, dni} = req.body
        let patients= []
        //console.log("entro");
        
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

        return res.json({data: patients, msj: "Transaccion Exitosa"})

    }

    //Agregar Paciente
    async addPatient(req, res){
        const newPatient = req.body
        
        if(!newPatient.dni || !newPatient.name){
            return res.json({data: null, msj: "Debe indicar dni y nombre"})
        }

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
        const newPatient = req.body
        
        if(!newPatient.dni){
            return res.json({data: null, msj: "Debe indicar dni"})
        }

        const updatedPatientDB = await mysqlPatientCRUD.updatePatientByDni(newPatient)
        
        if(updatedPatientDB == -1){
            return res.json({data: -1, msj: `No existe el paciente con dni ${newPatient.dni}`})
        }
        if(updatedPatientDB == null){
            return res.json({data: null, msj: "Error al intentar actualizar el paciente"})
        }

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