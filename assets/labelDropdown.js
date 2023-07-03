const dropdownItems = document.querySelectorAll(".dropdown-item");
const checkboxes = document.querySelectorAll('input[name="labels"]');

dropdownItems.forEach((item) => {
  item.addEventListener("click", () => {
    const selectedLabel = item.dataset.label;
    checkboxes.forEach((checkbox) => {
      if (checkbox.value === selectedLabel) {
        checkbox.checked = true;
      }
    });
  });
});
