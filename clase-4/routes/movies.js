const { Router } = require('express')
const moviesRouter = Router()

const MovieController = require ('../controllers/movies')

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get('/:id', MovieController.getById)

moviesRouter.post('/', MovieController.create)

moviesRouter.patch('/:id', MovieController.update)

moviesRouter.delete('/:id', MovieController.delete)

module.exports = moviesRouter