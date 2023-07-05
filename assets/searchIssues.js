document.addEventListener("DOMContentLoaded", function () {
  //get the form
  const searchIssueForm = document.getElementById("search-issue-form");
  // get the details of the issues of the project in json
  const searchJson = document.getElementById("issue-data").getAttribute("data");
  // parse the data
  const searchIssues = JSON.parse(searchJson);
  // get element where searched t will be shown
  const searchList = document.querySelector("#search-issues-list");

  searchIssueForm.addEventListener("submit", function (e) {
    e.preventDefault();

    //create empty array where result will be stored
    // let searchedIssues = [];

    //get all the form data

    let titleValue = searchIssueForm.querySelector('input[name="tie"]').value,
      value;
    let descriptionValue =
      searchIssueForm.querySelector('input[name="des"]').value;

    //add issue to searched issues array
    // searchIssues.map((el) => {
    //   if (el.title == titleValue && el.description == descriptionValue) {
    //     if (!searchedIssues.includes(el)) {
    //       searchedIssues.push(el);
    //     }
    //   }
    // });

    let searchedIssues = searchIssues.filter((el) => {
      if (titleValue && descriptionValue) {
        return (
          el.title.includes(titleValue) &&
          el.description.includes(descriptionValue)
        );
      } else if (titleValue) {
        return el.title.includes(titleValue);
      } else if (descriptionValue) {
        return el.description.includes(descriptionValue);
      }
      return false;
    });

    //create a div and add details of the searched issues
    let searchCards = "";
    for (let issue of searchedIssues) {
      searchCards += `
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

    searchList.innerHTML = searchCards;
  });
});
