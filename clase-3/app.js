const express = require('express')
const app = express()
const moviesJSON = require('./movies.json')
const crypto = require('node:crypto')
const {validateMovie, validateParcialMovie} = require('./schemas/movies')
const cors = require('cors')

app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'https://movies.com',
      'https://midu.dev'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

app.disable('x-powered-by')





app.listen(3000,()=>{
    console.log('Server listen on port http://localhost:3000')
})
app.get('/',(req,res)=>{
    res.json({message: 'Hoola mundo'})
})

app.get('/movies',(req,res)=>{
 
    const {genre} = req.query
    if (genre) {
        const filteredMovies = moviesJSON.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.status(200).json(moviesJSON)
})

app.get('/movies/:id',(req,res)=>{
    const {id} = req.params
    const movie = moviesJSON.find(movie => movie.id === id)
    if (movie) return  res.json(movie)
    res.status(404).json({message: 'Movie not found'})
    
})

app.post('/movies',(req,res)=>{

    const result  = validateMovie(req.body)

    if (result.error) {
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }
    
    const newMovie={
        id: crypto.randomUUID(),
        ...result.data
    }
    
    moviesJSON.push(newMovie)

    res.status(201).json(newMovie)
})

app.patch('/movies/:id',(req,res)=>{
    
    const result = validateParcialMovie(req.body)
    console.log(result)
  
    if (!result.success) {
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const {id} = req.params

    const movieIndex = moviesJSON.findIndex(movie => movie.id === id)
    if (movieIndex === -1) {
        return res.status(404).json({message : 'Movie not found'})
    }

    const updateMovie={
        ...moviesJSON[movieIndex],
        ...result.data
    }

    moviesJSON[movieIndex] = updateMovie

    return res.json(updateMovie)

})

app.delete('/movies/:id',(req,res)=>{

    const {id} = req.params

    const deletedMovieIndex = moviesJSON.findIndex(movie => movie.id === id)
    
    if (deletedMovieIndex === -1) {
        return res.status(404).json({message : 'Movie not found'})
    }

    moviesJSON.splice(deletedMovieIndex,1)

    return res.status(204).json({message: 'Movie deleted'})
})
