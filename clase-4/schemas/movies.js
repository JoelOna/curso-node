const z = require('zod')

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie titlte must be a string',
        required_error: 'Movie title is required'
    }),
    year: z.number().int().positive().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().positive().max(10).optional(),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: z.array(
        z.enum(['Action','Adventure','Comedy','Drama','Fantasy','Horror','Thriller','Sci-Fi']),
        {
            required_error: 'Genre is requred.'
        }
    )

})

function validateMovie(object){
    return movieSchema.safeParse(object)
}

function validateParcialMovie(object){
    console.log(object)
    return movieSchema.partial().safeParse(object) // El parcial te lo hace opcional todo
}

module.exports= {validateMovie,validateParcialMovie}