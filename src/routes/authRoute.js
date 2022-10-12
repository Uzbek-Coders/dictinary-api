import { Router } from 'express'
import controller from '../controller/authController.js'
import authAdmin from '../middleware/authAdminMiddleware.js'
import roleMiddleware from '../middleware/roleMiddleware.js'
// import authMiddleware from'../middleware/authMiddleware.js'


const router = new Router()

router.post('/register', controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['USER', 'ADMIN']), controller.getUsers)
router.get('/access', authAdmin(['USER', 'ADMIN']))


export default router
