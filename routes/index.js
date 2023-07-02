const express = require('express');
const router = express.Router();

const homeController = require('../controller/home_controller');


// Welcome Page
router.get('/', (req, res) => res.render('home',{
    title: 'NodeJs - Issue Tracker | Home',
    // projects,
  }));
router.use('/project', require('./project'));



module.exports = router;
