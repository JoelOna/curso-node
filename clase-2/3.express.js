const express = require('express')
const app = express()
const dittoJSON = require('./pokemon/ditto.json')


app.disable('x-powered-by')

app.use(express.json())

// app.use((req,res,next)=>{
//     if (req.methos !== 'Post') return next()
//     if (req.headers['content-type'] !== 'application/json') return next()
//     let body = ''
//     req.on('data',info =>{
//         body += info.toString()
//     })
//     req.on('end', ()=>{
//         const data = JSON.parse(body)
//         data.timestamp = Date.now(0)
//         // poner el data en el body de la request
//         req.body = data
//         next()
//     })
// })


app.get('/', (req,res)=>{
    res.status(200).end('<h1>Mi página</h1>')
})
app.get('/pokemon/ditto',(req,res)=>{
    res.status(200).json(dittoJSON)
})


app.post('/pokemon', (req,res)=>{
    res.status(201).json(req.body)
})

// Poner al final si no encuentra uan ruta saltara aqui
app.use((req,res)=>{
    res.status(404).send('404 Not found')
})

app.listen(3000 ,()=>{
    console.log('server on port http://localhost:3000')
})