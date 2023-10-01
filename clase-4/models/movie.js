const movies = require('../movies.json')
const crypto = require('node:crypto')

class MovieModel{
    static getAll= async ({genre})=>{
        if (genre) {
            return movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
        }
    }

    static async getById ({id}){
        const movie = movies.find(movie => movie.id === id)
        return movie
    }

    static async create ({input}){
        const newMovie={
            id: crypto.randomUUID(),
            ...input
        }
        
        movies.push(newMovie)
        return newMovie
    }

    static async delete ({id}){

        const deletedMovieIndex = movies.findIndex(movie => movie.id === id)
    
        if (deletedMovieIndex === -1) {
            return false
        }
    
        return movies.splice(deletedMovieIndex,1)
    }

    static async update ({id , input}) {
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex === -1) {
            return false
        }

        const updateMovie={
            ...movies[movieIndex],
            ...input
        }
    
        movies[movieIndex] = updateMovie
    
        return updateMovie
    }
}

module.exports = MovieModel