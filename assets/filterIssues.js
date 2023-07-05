document.addEventListener("DOMContentLoaded", function () {
  // Your code here

  // get the form
  const filterIssueForm = document.getElementById("filter-issue-form");
  // get the details of the issues of the project in json
  const issuesJson = document.getElementById("issue-data").getAttribute("data");
  // parse the data
  const issues = JSON.parse(issuesJson);
  // get element where filtered issues will be shown
  const issueList = document.querySelector("#issues-list");

  filterIssueForm.addEventListener("submit", function (e) {
    e.preventDefault();

    //create empty array where result will be stored
    let filteredIssues = [];

    //get all the form data
    let labelsList = filterIssueForm.querySelectorAll(
      "input[name=labels]:checked"
    );
    let labelsElements = [...labelsList];

    let authorVal = filterIssueForm.querySelector(
      "input[type=radio][name=author]:checked"
    ).value;

    let labelsArr = [...labelsElements].map((Element) => Element.value);

    //add issue to filtered issues array
    // issues.map((el) => {
    //   if (el.author == authorVal) {
    //     if (!filteredIssues.includes(el)) {
    //       filteredIssues.push(el);
    //     }
    //   }
    //   labelsArr.map((label) => {
    //     if (el.labels.includes(label)) {
    //       if (!filteredIssues.includes(el)) {
    //         filteredIssues.push(el);
    //       }
    //     }
    //   });
    // });
    issues.forEach((el) => {
      if (el.author == authorVal) {
        if (!filteredIssues.some((issue) => issue._id === el._id)) {
          filteredIssues.push(el);
        }
      }
      labelsArr.forEach((label) => {
        if (el.labels.includes(label) || el.keywords.includes(label)) {
          if (!filteredIssues.some((issue) => issue._id === el._id)) {
            filteredIssues.push(el);
          }
        }
      });
    });

    //create a div and add details of the filtered issues
    let filteredCards = "";
    for (let issue of filteredIssues) {
      filteredCards += `
  <div class="col-md-6">
    <div class="card mb-3 rounded">
      <h3 class="card-header row g-2 flex-wrap fs-5">
        ${issue.labels
          .map(
            (lab) => `
          <div class="col-auto">
            <span class="badge rounded-pill bg-danger p-2">${lab}</span>
          </div>
        `
          )
          .join("")}
        ${issue.keywords
          .map(
            (key) => `
          <div class="col-auto">
            <span class="badge rounded-pill bg-info p-2">${key}</span>
          </div>
        `
          )
          .join("")}
      </h3>
      <div class="card-body">
        <h5 class="card-title fs-3">${issue.title}</h5>
        <h6 class="card-subtitle text-muted fs-5">${issue.author}</h6>
        <p class="card-text mt-3">${issue.description}</p>
      </div>
      <div class="container mb-3">
        <a href="/project/issue/delete/${
          issue._id
        }" class="btn btn-danger">Delete</a>
      </div>
    </div>
  </div>
`;
    }

    issueList.innerHTML = filteredCards;
  });
});
