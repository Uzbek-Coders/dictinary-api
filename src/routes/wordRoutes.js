import express from "express";
import {
    wordCreateEngUzb,
    wordCreateUzbEng,
    wordReadEngUzb,
    wordReadUzbEng,
    wordFindEngUzb,
    wordFindUzbEng,
    wordDeleteEngUzb,
    wordDeleteUzbEng,
    wordUpdateEngUzb,
    wordUpdateUzbEng,
    wordFindIdUzbEng,
    wordFindIdEngUzb,
} from "../controller/wordController.js";
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
// Find
route.get("/user/find/eng-uzb/", wordFindIdEngUzb);
route.get("/user/find/uzb-eng/", wordFindIdUzbEng);
// Delete
route.post("/admin/delete/eng-uzb",  roleMiddleware(["USER", "ADMIN"]), wordDeleteEngUzb);
route.post("/admin/delete/uzb-eng",  roleMiddleware(["USER", "ADMIN"]), wordDeleteUzbEng);
// Update
route.post("/admin/update/eng-uzb", roleMiddleware(["USER", "ADMIN"]), wordUpdateEngUzb);
route.post("/admin/update/uzb-eng",  roleMiddleware(["USER", "ADMIN"]), wordUpdateUzbEng);

// WARNING,
// route.post("/warning/warning", deleleteProperty)
export default route;