import { Router } from "express";
import { socialSecurityController } from "../controllers/socialSecurity.controller.js";

const router = Router()

//Obtener todas las OS
router.get('/', socialSecurityController.getAllSocialSecuritys)

 //Obtener OS por nomrbe
router.get('/:name', socialSecurityController.getSocialSecurityByName)

//Agregar OS
router.post('/', socialSecurityController.addSocialSecurity)

//Actualizar OS por nombre
router.put('/', socialSecurityController.updateSocialSecurityByname)

//Borrar OS por nombre
router.delete('/:name', socialSecurityController.deleteSocialSecurityByname)



export default router