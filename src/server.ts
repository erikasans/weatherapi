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
    const clima = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3b3836b920c3f264109f5219ca6a5591&units=metric`)

    return res.json(clima.data)
})

//lista tempo por cidade
app.get('/weather/:id', async(req,res) => {
    const city = req.params.id

    const clima = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3b3836b920c3f264109f5219ca6a5591&units=metric`)
    
    return res.json(clima.data)
})

//favorita localização(por nome)
app.post('/save/:id', async(req,res) => {
    const city = req.params.id
    const body = req.body

   await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3b3836b920c3f264109f5219ca6a5591&units=metric`)

    const salvar = await prisma.CurrentWeather.create({
        data: { 
            city: body.city,
            lat: body.lat,
            lon: body.lon,
            dt: body.dt,
            temp: body.temp,
            feels : body.feels_like,
            sunrise : body.sunrise,
            sunset : body.sunset,
        }
    })

    await axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3b3836b920c3f264109f5219ca6a5591&units=metric`, salvar)

    return res.status(201).json(salvar);

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

