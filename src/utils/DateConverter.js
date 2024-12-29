

/* ---------------- Convertir de DD/MM/AAAA al tipo de mysql ---------------- */
export const dateFrontToBack = (dateFront) => {
    /* 
        Hay que pasar de "DD/MM/AAAA" a "AAAA/MM/DD" que es el formato que le gusta a mysql
    */
    let fechaHora = dateFront.split(" ")
    
    // Dividir el string por el carácter "/"
    let partesFecha = fechaHora[0].split('/')

    // Asignar cada parte a una variable
    let dia = partesFecha[0];
    let mes = partesFecha[1];
    let año = partesFecha[2];

    let hora = "00" 
    let minutos = "00"
    let segundos = "00"
    if(fechaHora[1]){
        let partesHora = fechaHora[1].split(':')

        hora = partesHora[0] || "00"
        minutos = partesHora[1] || "00"
        segundos = "00"
    }


    // Convertir a formato "YYYY-MM-DD" (formato que MySQL acepta)
    let fechaMySQL = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

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
    let dia = fecha.getDate()
    let mes = fecha.getMonth() +1 //Los meses los devuelve desde el cero
    const año = fecha.getFullYear()
    
    dia      < 10 && (dia      = `0${String(dia)}`)
    mes      < 10 && (mes      = `0${String(mes)}`)

    const dateFront = `${dia}/${mes}/${año}`
    //console.log(dateFront);
    
    return dateFront
}

export const dateBackToFrontConHora = (dateBack) => {
    /* 
        Hay que pasar de  "AAAA/MM/DD" a "DD/MM/AAAA" que es el formato que le gusta al front
    */
    
    const fecha = new Date(dateBack)
    let dia = fecha.getDate()
    let mes = fecha.getMonth() +1 //Los meses los devuelve desde el cero
    let año = fecha.getFullYear()
    let hora = fecha.getHours()
    let minutos = fecha.getMinutes()
    let segundos = fecha.getSeconds()

    dia      < 10 && (dia      = `0${String(dia)}`)
    mes      < 10 && (mes      = `0${String(mes)}`)
    hora     < 10 && (hora     = `0${String(hora)}`)
    minutos  < 10 && (minutos  = `0${String(minutos)}`)
    segundos < 10 && (segundos = `0${String(segundos)}`)


    const dateFront = `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`
    //console.log(dateFront);
    
    return dateFront
}





//const fechaMysql = dateFrontToBack("03/04/2451")

//console.log(fechaMysql);
