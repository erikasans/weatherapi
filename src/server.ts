import express from 'express'
import { PrismaClient } from '@prisma/client/';
import cors  from 'cors';
import axios from 'axios'

const prisma = new PrismaClient({
    log:['query']
})

const app = express();
app.use(cors())

//lista tempo por latitude e longitude
app.get('/clima/:LonId/:LatId', async(req,res) => {
    const lon = req.params.LonId
    const lat = req.params.LatId
    const clima = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=api_token&units=metric&lang=pt_br`)

    return res.json(clima.data)
})

//lista tempo por cidade
app.get('/weather/:id', async(req,res) => {
    const city = req.params.id

    const clima = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=api_token&units=metric&lang=pt_br`)
    
    return res.json(clima.data)
})

//favorita localização(por nome)
app.post('/save/:id', async(req,res) => {
    const city = req.params.id

    const dados = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=api_token&units=metric&lang=pt_br`)
    
    const save = await prisma.CurrentWeather.create({
        data: { 

            city: dados.data.name,
            lat: dados.data.coord.lat,
            lon: dados.data.coord.lon,
            dt: dados.data.dt,
            temp: dados.data.main.temp,
            feels : dados.data.main.feels_like,
            sunrise : dados.data.sys.sunrise,
            sunset : dados.data.sys.sunset,
        }
    })


    return res.json(save);

})



// Teste
app.get('/', async (req,res) => {
    const weather = await prisma.CurrentWeather.findMany({
        where: {
            city: 'New_York'
        }
    })
    
    return res.json(weather)
})


app.listen(3333, () => {
    console.log("Running")
})

