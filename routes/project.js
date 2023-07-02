const express = require('express');

const router = express.Router();
const projectController = require('../controller/project_controller');

// router.post('/create', projectController.create);   //To create a New Project

router.get('/', (req, res) => res.render('project-details',{
    title: 'Project Details',
    // project,
  }));      
//router.get('/:id', projectController.project); //To fetch Project Details Page

// router.post('/:id', projectController.createIssue); //To create Issue

module.exports = router;