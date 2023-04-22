import { CreatePDF, ReadPDF } from "../controller/pdfcontroller.js";
import { Router } from 'express'


const router = new Router()

router.get('/file/create', CreatePDF)
router.get('/file/get', ReadPDF)
console.log("hello123")

export default router