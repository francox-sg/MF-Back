import { mysqlClinicalHistoryCRUD } from "../mysql/clinical_history.dao.js";
import { mysqlPatientCRUD } from "../mysql/patient.dao.js";




class clinicalHistoryControllerClass{
    
    //Obtener todas las HC
    async getAllclinicalHistorys(req, res){
        
        const clinicalHistorys = await mysqlClinicalHistoryCRUD.getAllClinicalHistorys()
        
        if(clinicalHistorys == null){
            return res.json({data: null, msj: "Error al intentar obtener las HC"})
        }
        return res.json({data: clinicalHistorys, msj: "Transaccion Exitosa"})

    }
    
    //Obtener HC por ID
    async getClinicalHistoryById(req, res){
        const {id} = req.params
        
        if(!id){
            return res.json({data: null, msj: "Debe indicar el ID de la HC"})
        }

        const clinicalHistoryDB = await mysqlClinicalHistoryCRUD.getClinicalHistoryById(id)
        
        if(clinicalHistoryDB == -1){
            return res.json({data: -1, msj: "No se encontro la HC"})
        }
        if(clinicalHistoryDB == null){
            return res.json({data: null, msj: "Error al intentar obtener la HC"})
        }

        return res.json({data: clinicalHistoryDB, msj: "Transaccion Exitosa"})

    }
    //Obtener HC por ID de Paciente
    async getClinicalHistoryByPatientId(req, res){
        const {pid} = req.params
        
        if(!pid){
            return res.json({data: null, msj: "Debe indicar el ID del paciente"})
        }

        const clinicalHistoryDB = await mysqlClinicalHistoryCRUD.getClinicalHistoryByPatientId(pid)
        
        if(clinicalHistoryDB == -1){
            return res.json({data: -1, msj: "No se encontro la HC"})
        }
        if(clinicalHistoryDB == null){
            return res.json({data: null, msj: "Error al intentar obtener la HC"})
        }

        return res.json({data: clinicalHistoryDB, msj: "Transaccion Exitosa"})

    }

    //Formateo de Fecha
    async formatearFecha(){
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
        console.log({fechaFormateada});
        
        return fechaFormateada
    }

    //Agregar HC
    async addClinicalHistory(req, res){
        let newClinicalHistory = req.body

        // Agrego al fecha
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
        
        newClinicalHistory.date = fechaFormateada



        if(!newClinicalHistory.patient_id){
            return res.json({data: null, msj: "Debe indicar el ID del paciente"})
        }

        const existePaciente = await mysqlPatientCRUD.getPatientById(newClinicalHistory.patient_id)
        if(existePaciente == -1){
            return res.json({data: null, msj: `No existe el Paciente con ID: ${newClinicalHistory.patient_id}`})
        }

        const newClinicalHistoryDB = await mysqlClinicalHistoryCRUD.addClinicalHistory(newClinicalHistory)
        
        if(newClinicalHistoryDB == null){
            return res.json({data: null, msj: "Error al intentar crear la HC"})
        }

        return res.json({data: newClinicalHistoryDB, msj: "Transaccion Exitosa"})

    }

    //Modificar HC por ID
    async updateClinicalHistoryById(req, res){
        const newClinicalHistory = req.body
        
        if(!newClinicalHistory.id){
            return res.json({data: null, msj: "Debe indicar el id"})
        }

        const updatedclinicalHistoryDB = await mysqlClinicalHistoryCRUD.updateClinicalHistoryById(newClinicalHistory)
        
        if(updatedclinicalHistoryDB == -1){
            return res.json({data: -1, msj: `No existe la HC con ID ${newClinicalHistory.id}`})
        }
        if(updatedclinicalHistoryDB == null){
            return res.json({data: null, msj: "Error al intentar actualizar la HC"})
        }

        return res.json({data: updatedclinicalHistoryDB, msj: "Transaccion Exitosa"})

    }

    //Borrar HC por ID
    async deleteClinicalHistoryById(req, res){
        const {id} = req.params
        
        if(!id){
            return res.json({data: null, msj: "Debe indicar el id"})
        }

        const deletedClinicalHistoryDB = await mysqlClinicalHistoryCRUD.deleteClinicalHistoryById(id)
        
        if(deletedClinicalHistoryDB == -1){
            return res.json({data: -1, msj: `No existe la HC con id ${id}`})
        }
        if(deletedClinicalHistoryDB == null){
            return res.json({data: null, msj: "Error al intentar eliminar la HC"})
        }

        return res.json({data: deletedClinicalHistoryDB, msj: "Transaccion Exitosa"})

    }




}

export const clinicalHistoryController = new clinicalHistoryControllerClass()