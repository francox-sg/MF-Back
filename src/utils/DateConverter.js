

/* ---------------- Convertir de DD/MM/AAAA al tipo de mysql ---------------- */
export const dateFrontToBack = (dateFront) => {
    /* 
        Hay que pasar de "DD/MM/AAAA" a "AAAA/MM/DD" que es el formato que le gusta a mysql
    */

    // Dividir el string por el carácter "/"
    let partesFecha = dateFront.split('/')

    // Asignar cada parte a una variable
    let dia = partesFecha[0];
    let mes = partesFecha[1];
    let año = partesFecha[2];

    // Convertir a formato "YYYY-MM-DD" (formato que MySQL acepta)
    let fechaMySQL = `${año}-${mes}-${dia}`;

    // Mostrar la fecha en formato MySQL
    //console.log(fechaMySQL); // "2024-12-21"

    // Si necesitas trabajar con la fecha como un objeto Date en JavaScript:
    //let fechaBack = new Date(fechaMySQL);
    
    

    
    return fechaMySQL
    
}


export const dateBackToFront = (dateBack) => {
    /* 
        Hay que pasar de  "AAAA/MM/DD" a "DD/MM/AAAA" que es el formato que le gusta al front
    */
    
    const fecha = new Date(dateBack)
    const dia = fecha.getDate()
    const mes = fecha.getMonth() +1 //Los meses los devuelve desde el cero
    const año = fecha.getFullYear()
    
    const dateFront = `${dia}/${mes}/${año}`
    //console.log(dateFront);
    
    return dateFront
}