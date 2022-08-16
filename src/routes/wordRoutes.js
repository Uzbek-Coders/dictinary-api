import express from "express";
import {  wordCreateEngUzb, wordCreateUzbEng, wordReadEngUzb, wordReadUzbEng, wordFindEngUzb, wordFindUzbEng, wordUpdateEngUzb, wordUpdateUzbEng } from "../controller/wordController.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
const route = express.Router();

// Create
route.post("/admin/create/eng-uzb", roleMiddleware(["USER", "ADMIN"]), wordCreateEngUzb);
route.post("/admin/create/uzb-eng", roleMiddleware(["USER", "ADMIN"]), wordCreateUzbEng);
// Read
route.get("/user/read/eng-uzb", wordReadEngUzb);
route.get("/user/read/uzb-eng", wordReadUzbEng);
// Find
route.get("/user/find/eng-uzb/:word", wordFindEngUzb);
route.get("/user/find/uzb-eng/:word", wordFindUzbEng);
// Update
route.post("/admin/update/eng-uzb", wordUpdateEngUzb);
route.post("/admin/update/uzb-eng", wordUpdateUzbEng);

// WARNING
// route.post("/warning/warning", deleleteProperty)
export default route;