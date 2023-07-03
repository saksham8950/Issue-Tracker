const Project = require("../models/project");
const Issue = require("../models/issue");

// Create an Issue
module.exports.createIssue = async (req, res) => {
  try {
    let project = await Project.findOne(req.params._id);
    if (project) {
      let issue = await Issue.create({
        title: req.body.title,
        description: req.body.description,
        labels: req.body.labels,
        author: req.body.author,
      });
      project.issues.push(issue);

      if (!(typeof req.body.labels === "string")) {
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
      await project.save();
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
// module.exports.deleteIssue = (req, res) => {
//   const issueId = req.params._id;

//   Issue.findOneAndDelete(req._id)
//     .then((deletedIssue) => {
//       if (!deletedIssue) {
//         console.log("Issue not found");
//         return res.redirect("back");
//       }

//       console.log("Issue Deleted Successfully");

//       const projectFilter = { issues: issueId };
//       const projectUpdate = {
//         $pull: {
//           issues: issueId,
//           labels: { $in: deletedIssue.labels },
//         },
//       };
//       return Project.findByIdAndUpdate(projectFilter, projectUpdate);
//     })
//     .then((result) => {
//       if (result > 0) {
//         console.log("Project Updated Successfully");
//       } else {
//         console.log("No changes made to the project");
//       }

//       console.log("#------------#-----------#");
//       return res.redirect("back");
//     })
//     .catch((err) => {
//       console.log("Error in deleting", err);
//       return res.redirect("back");
//     });
// };

module.exports.deleteIssue = async (req, res) => {
  try {
    let issue = await Issue.findById(req._id);

    // let issueId = issue._id;
    let projectId = issue.project;

    issue.deleteOne();
    console.log("Issue Deleted Successfully");

    const projectUpdate = {
      $pull: {
        issues: req._id,
        labels: { $in: deletedIssue.labels },
      },
    };

    Project.findByIdAndUpdate(projectId, projectUpdate);

    console.log("Project Updated Successfully");
    console.log("#------------#-----------#");
    return res.redirect("back");
  } catch (err) {
    console.log("Error in deleting", err);
    return res.redirect("back");
  }
};
