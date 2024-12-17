import { Router } from "express";
import { clinicalHistoryController } from "../controllers/clinicalHistory.controller.js";

const router = Router()

//Obtener todas las HC
router.get('/', clinicalHistoryController.getAllclinicalHistorys)

 //Obtener HC por Id
router.get('/:id', clinicalHistoryController.getClinicalHistoryById)

 //Obtener HC por PatientId
router.get('/patient/:pid', clinicalHistoryController.getClinicalHistoryByPatientId)

//Agregar HC
router.post('/', clinicalHistoryController.addClinicalHistory)

//Actualizar HC por ID
router.put('/', clinicalHistoryController.updateClinicalHistoryById)

//Borrar HC por ID
router.delete('/:id', clinicalHistoryController.deleteClinicalHistoryById)



export default router