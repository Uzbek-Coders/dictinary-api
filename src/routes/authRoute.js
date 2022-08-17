import Router from'express'
const router = new Router()
import controller from '../controller/authController.js'
// import authMiddleware from'../middleware/authMiddleware.js'
import roleMiddleware from'../middleware/roleMiddleware.js'

router.post('/register', controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(["USER", "ADMIN"]),  controller.getUsers)

export default router