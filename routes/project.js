const express = require("express");

const router = express.Router();
const projectController = require("../controller/project_controller");
const issueController = require("../controller/issue_controller");

router.post("/create", projectController.createProject); //To create a New Project
router.get("/delete/:id", projectController.deleteProject); //To delete a Project
router.get("/:id", projectController.project); //To fetch Project Details Page

router.post("/issue/create/:id", issueController.createIssue); //To create Issue
router.get("/issue/delete/:id", issueController.deleteIssue); //To delete an Issue

module.exports = router;
