import { Router } from 'express'
import roleMiddleware from '../middleware/roleMiddleware.js'
import idMiddleware from '../middleware/idMiddleware.js'
import {
    create,
    read,
    many,
    updateOne,
    deleteOne,
    tag
} from '../controller/articleController.js'


const router = new Router()

router.route('/')
    .post(roleMiddleware(['USER', 'ADMIN']), create)
    .get(many)

router.route('/:id')
    .get(idMiddleware, read)
    .put(idMiddleware, roleMiddleware(['USER', 'ADMIN']), updateOne)
    .delete(idMiddleware, roleMiddleware(['USER', 'ADMIN']), deleteOne)

router.get('/tag/:tag', tag)


export default router
