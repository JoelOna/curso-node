const express = require('express')
const app = express()
const moviesRouter = require('./routes/movies')
const corsMiddelware = require('./middlewares/cors')

app.use(express.json())
// app.use(corsMiddelware())

app.disable('x-powered-by')
app.use('/movies',moviesRouter)



app.listen(3000,()=>{
    console.log('Server listen on port http://localhost:3000')
})
