const MovieModel = require("../models/movie")
const {validateMovie, validateParcialMovie} = require('../schemas/movies')

class MovieController {
    static async getAll (req,res) {
        const {genre} = req.query
        const movies = await MovieModel.getAll({genre})

        res.json(movies)
    }

    static async getById (req,res){
        const {id} = req.params
        const movie = await MovieModel.getById({id})
        if (movie) return  res.json(movie)
        res.status(404).json({message: 'Movie not found'})
    }

    static async create(req,res){
        const result  = validateMovie(req.body)

        if (result.error) {
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
        
        const newMovie = MovieModel.create(result.data)
        res.status(201).json(newMovie)
    }

    static async update (req,res){
        const result = validateParcialMovie(req.body)
        console.log(result)
      
        if (!result.success) {
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
    
        const {id} = req.params
    
      const updateMovie = await MovieModel.update({id,input: result.data})
    
        return res.json(updateMovie)
    }

    static async delete (req,res){
        const {id} = req.params

        const deletedMovieIndex = await MovieModel.delete({id})
    
        return res.status(204).json({message: 'Movie deleted ',deletedMovieIndex})
    }
}

module.exports = MovieController