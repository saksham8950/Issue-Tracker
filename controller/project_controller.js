const Project = require("../models/project");
const Issue = require("../models/issue");

//Create a Project
module.exports.createProject = (req, res) => {
  const project = new Project({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
  });

  project
    .validate()
    .then(() => {
      // Validation succeeded
      console.log("Validation succeeded");
    })
    .then(() => {
      // Save the Project
      project.save();

      // Project saved successfully
      req.flash("success_msg", "Project Created");
      // console.log("Project saved successfully");
      // console.log("#------------#-----------#");
      return res.redirect("back");
    })
    .catch((error) => {
      // Handle error
      console.log("Error in saving or validation", error);
      return res.redirect("back");
    });
};

//Delete a Project
module.exports.deleteProject = (req, res) => {
  Project.findOneAndDelete(req._id)
    .then(() => {
      req.flash("error_msg", "Project Deleted");
      // console.log("Deleted Successfully");
      // console.log("#------------#-----------#");
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("Error in deleting", err);
      return res.redirect("back");
    });
};

//Fetch a Project
module.exports.project = (req, res) => {
  Project.findOne(req._id)
    .populate({ path: "issues" })
    .then((project) => {
      return res.render("project-details", {
        title: "Project Details",
        project,
      });
    })
    .catch((err) => {
      console.log("Error in finding the project to display", err);
      return res.redirect("back");
    });
};
