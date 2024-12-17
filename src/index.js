import express from 'express'
import patientRouter from './routes/patient.routes.js'
import socialSecurityRouter from './routes/socialSecurity.routes.js'
import clinicalHistoryRouter from './routes/clinicalHistory.routes.js'
import cors from 'cors'


const PORT = 8080
const app = express()

//Middlewares
app.use(cors())
app.use(express.json()) //Middleware para entender JSON que vine del Body de los req
app.use(express.urlencoded({extended:true})) //Reconoce Parametros de URL

app.use('/patient', patientRouter)
app.use('/socialsecurity', socialSecurityRouter)
app.use('/clinicalHistory', clinicalHistoryRouter)

app.listen(PORT, ()=>{
    console.log(`Servidor listo en puerto ${PORT}`);
    
})

// npm run build

// npx pkg dist/index.js -t node*-win-x64 --output API_medicalform.exe