import express from "express";
import {  wordCreateEngUzb, wordCreateUzbEng, wordReadEngUzb, wordReadUzbEng, wordFindEngUzb, wordFindUzbEng, deleleteProperty } from "../controller/wordController.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
const route = express.Router();

// Create
route.post("/admin/create/eng-uzb", roleMiddleware(["USER", "ADMIN"]), wordCreateEngUzb);
route.post("/admin/create/uzb-eng", roleMiddleware(["USER", "ADMIN"]), wordCreateUzbEng);
// Read
route.get("/admin/read/eng-uzb", wordReadEngUzb);
route.get("/admin/read/uzb-eng", wordReadUzbEng);
// Find
route.get("/admin/find/eng-uzb/:word", wordFindEngUzb);
route.get("/admin/find/uzb-eng/:word", wordFindUzbEng);
// Update
route.post("/admin/update/eng-uzb", );

// WARNING
route.post("/warning/warning", deleleteProperty)
export default route;
