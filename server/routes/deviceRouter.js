import Router from 'express'
import checkRole from '../middleware/checkRoleMiddleware.js'
import deviceController from '../controllers/deviceController.js'
const router = new Router()

router.post('/', checkRole('ADMIN'), deviceController.create)
router.delete('/', checkRole('ADMIN'), deviceController.delete)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

export default router
