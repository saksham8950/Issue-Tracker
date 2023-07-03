// Code to Show Project Names in the Table
const Project = require("../models/project");

module.exports.home = async (req, res) => {
    try{
        let projects = await Project.find({}).sort('-createdAt');
        res.render("home", {
            title: "NodeJs - Issue Tracker | Home",
            projects,
          });
    }catch{
        console.log('Error', err);
        return;
    }
};
