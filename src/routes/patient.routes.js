import { Router } from "express";
import { patientController } from "../controllers/patient.controller.js";

const router = Router()

//Obtener todos los pacientes
router.get('/', patientController.getAllPatients)

//Obtener Pacientes por filtro
router.post('/filter/', patientController.getPatientByFilters)

//Obtener Paciente por dni
router.get('/dni/:dni', patientController.getPatientByDni)

//Obtener Paciente por ID
router.get('/:id', patientController.getPatientById)

//Agregar Paciente por dni
router.post('/', patientController.addPatient)

//Actualizar Paciente por dni
//router.put('/', patientController.updatePatientByDni)

//Actualizar Paciente por id
router.put('/', patientController.updatePatientById)

//Borrar Paciente por dni
router.delete('/:dni', patientController.deletePatientByDni)



export default router