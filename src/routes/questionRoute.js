import { Router } from 'express'
import { questionGet, questionCreate } from '../controller/questionController.js'
const router = new Router()

router.post('/question/get', questionGet)
router.post('/question/create', questionCreate)
console.log("hello1")

export default router