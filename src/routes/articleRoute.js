import { Router } from 'express'
import roleMiddleware from '../middleware/roleMiddleware.js'
import idMiddleware from '../middleware/idMiddleware.js'
import {
    create,
    read,
    many,
    updateOne,
    deleteOne,
    byTag,
    tags,
    popular,
    search
} from '../controller/articleController.js'


const router = new Router()

router.route('/')
    .post(roleMiddleware(['USER', 'ADMIN']), create)
    .get(many)

router.get('/popular', popular)

router.get('/tags', tags)
router.get('/tag/:tag', byTag)
router.get('/search/:text', search)

router.route('/:id')
    .get(idMiddleware, read)
    .put(idMiddleware, roleMiddleware(['USER', 'ADMIN']), updateOne)
    .delete(idMiddleware, roleMiddleware(['USER', 'ADMIN']), deleteOne)


export default router
