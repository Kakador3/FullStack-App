import Router from 'express'
import checkRole from '../middleware/checkRoleMiddleware.js'
import brandController from '../controllers/brandController.js'
const router = new Router()

router.post('/', checkRole('ADMIN'), brandController.create)
router.delete('/', checkRole('ADMIN'), brandController.delete)
router.get('/', brandController.getAll)

export default router
