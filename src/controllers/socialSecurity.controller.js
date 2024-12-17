import { mysqlSocialSecurityCRUD } from "../mysql/social_security.dao.js";

class socialSecurityControllerClass{
    
    //Obtener todas las OS
    async getAllSocialSecuritys(req, res){
        
        const socialSecuritys = await mysqlSocialSecurityCRUD.getAllSocialSecuritys()
        
        if(socialSecuritys == null){
            return res.json({data: null, msj: "Error al intentar obtener las Social Securitys"})
        }
        return res.json({data: socialSecuritys, msj: "Transaccion Exitosa"})

    }
    
    //Obtener OS por name
    async getSocialSecurityByName(req, res){
        const {name} = req.params
        
        if(!name){
            return res.json({data: null, msj: "Debe indicar nombre de OS"})
        }

        const socialSecurityDB = await mysqlSocialSecurityCRUD.getSocialSecurityByName(name)
        
        if(socialSecurityDB == -1){
            return res.json({data: -1, msj: "No se encontro la OS"})
        }
        if(socialSecurityDB == null){
            return res.json({data: null, msj: "Error al intentar obtener la OS"})
        }

        return res.json({data: socialSecurityDB, msj: "Transaccion Exitosa"})

    }

    //Agregar OS
    async addSocialSecurity(req, res){
        const newSocialSecurity = req.body
        
        if(!newSocialSecurity.name){
            return res.json({data: null, msj: "Debe indicar nombre"})
        }

        const newsocialSecurityDB = await mysqlSocialSecurityCRUD.addSocialSecurity(newSocialSecurity)
        
        if(newsocialSecurityDB == -1){
            return res.json({data: -1, msj: `Ya existe la OS con nombre ${newSocialSecurity.name}`})
        }
        if(newsocialSecurityDB == null){
            return res.json({data: null, msj: "Error al intentar crear el paciente"})
        }

        return res.json({data: newsocialSecurityDB, msj: "Transaccion Exitosa"})

    }

    //Modificar OS por nombre
    async updateSocialSecurityByname(req, res){
        const newSocialSecurity = req.body
        
        if(!newSocialSecurity.name){
            return res.json({data: null, msj: "Debe indicar nombre"})
        }

        const updatedSocialSecurityDB = await mysqlSocialSecurityCRUD.updateSocialSecurityByname(newSocialSecurity)
        
        if(updatedSocialSecurityDB == -1){
            return res.json({data: -1, msj: `No existe la OS con nombre ${newSocialSecurity.name}`})
        }
        if(updatedSocialSecurityDB == null){
            return res.json({data: null, msj: "Error al intentar actualizar la OS"})
        }

        return res.json({data: updatedSocialSecurityDB, msj: "Transaccion Exitosa"})

    }

    //Borrar OS por nombre
    async deleteSocialSecurityByname(req, res){
        const {name} = req.params
        
        if(!name){
            return res.json({data: null, msj: "Debe indicar nombre"})
        }

        const deletedSocialSecurityDB = await mysqlSocialSecurityCRUD.deleteSocialSecurityByname(name)
        
        if(deletedSocialSecurityDB == -1){
            return res.json({data: -1, msj: `No existe la OS con nombre ${name}`})
        }
        if(deletedSocialSecurityDB == null){
            return res.json({data: null, msj: "Error al intentar eliminar la OS"})
        }

        return res.json({data: deletedSocialSecurityDB, msj: "Transaccion Exitosa"})

    }


}

export const socialSecurityController = new socialSecurityControllerClass()