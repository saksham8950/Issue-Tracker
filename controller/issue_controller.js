const Project = require("../models/project");
const Issue = require("../models/issue");

// Create an Issue
module.exports.createIssue = async (req, res) => {
  try {
    const keywords = req.body.keywords
      .split(",")
      .map((keyword) => keyword.trim());

    let project = await Project.findOne(req.params._id);
    if (project) {
      let issue = await Issue.create({
        title: req.body.title,
        description: req.body.description,
        labels: req.body.labels,
        author: req.body.author,
        project: project._id,
        keywords: keywords,
      });
      project.issues.push(issue);

      // Push labelsin the Project
      if (!(typeof keywords === "string")) {
        for (let label of req.body.labels) {
          let isPresent = project.labels.find((obj) => obj == label);
          if (!isPresent) {
            project.labels.push(label);
          }
        }
      } else {
        let isPresent = project.labels.find((obj) => obj == req.body.labels);
        if (!isPresent) {
          project.labels.push(req.body.labels);
        }
      }
      if (!(typeof req.body.labels === "string")) {
        for (let key of keywords) {
          let isPresent = project.keywords.find((obj) => obj == key);
          if (!isPresent) {
            project.keywords.push(key);
          }
        }
      } else {
        let isPresent = project.keywords.find((obj) => obj == keywords);
        if (!isPresent) {
          project.kaywords.push(keywords);
        }
      }

      await project.save();
      console.log("Issue created Successfully");
      return res.redirect("back");
    } else {
      console.log("No such Project exist with this id");
      return res.redirect("back");
    }
  } catch (error) {
    console.log("An error in creating an issue", error);
    return res.redirect("back");
  }
};

//Delete a Issue
module.exports.deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    const projectId = issue.project.id;
    issue.deleteOne();
    console.log("Issue Deleted");
    // Project.findOneAndUpdate(
    //   { id: projectId },
    //   {
    //     $pull: { issues: issue.id },
    //   }
    // );
    console.log("Project Updated Successfully");
    console.log("#------------#-----------#");
    return res.redirect("back");
  } catch (err) {
    console.log("Error in Updating", err);
    return res.redirect("back");
  }
};
