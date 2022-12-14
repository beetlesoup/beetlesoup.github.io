// If we save our current state somewhere, we can easily filter the divs.
var checkedCategories = ["cars", "animals", "fruits", "colors"];
// We need a function that detects the click on a checkbox and adds/removes that category.
var changeCategory = function changeCategory(event) {
  // The event object will tell us exactly what was clicked.
  var checkbox = event.target;
  // The category we want toa dd or remove is the attribute
  var category = checkbox.getAttribute("data-category");
  // To check if we already have the category in the array, we just check the index.
  var savedCategoryIndex = checkedCategories.indexOf(category);
  // If the checkbox is checked, that category has to already exist in the array or get added.
  if (checkbox.checked && savedCategoryIndex === -1) {
    checkedCategories.push(category);
  }
  // if it is not checked and is present in the array, it needs to be removed.
  else if (!checkbox.checked && savedCategoryIndex !== -1) {
    checkedCategories.splice(savedCategoryIndex, 1);
  }
  renderCategories();
};
// We want a reusable function that will show/hide any categories we want to see.
var renderCategories = function renderCategories() {
  // We need a list of all the divs. So we just select all the divs that have the data-category attribute and slice them into an array.
  // Could be replaced by Array.from() if your browser supports it.
  var categoryDivs = Array.prototype.slice.call(document.querySelectorAll("div[data-category]"));
  // Now we need to loop over all the divs and check if they need to get hidden or not.
  categoryDivs.forEach(function(div) {
    // Get all the tags the div has
    var tags = div.getAttribute("data-category").split(" ");
    // If at least one tag of the div is inside our categories array, we know it'll need to get shown.
    var divShouldBeShown = tags.some(function(tag) {
      return checkedCategories.indexOf(tag) !== -1;
    });
    // The decide if we need to hide the div or not.
    // Can be replaced by a classList.toggle() if your browser supports it.
    if (divShouldBeShown && div.className.indexOf("hidden") !== -1) {
      div.className = div.className.replace("hidden", "");
    } else if (!divShouldBeShown && div.className.indexOf("hidden") === -1) {
      div.className = div.className + " hidden";
    }
  });
};
// Finally we have to add an event to the checkboxes.
document.querySelector("#categoryBoxes").addEventListener('click', changeCategory);


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}


var coll = document.getElementsByClassName("filtercollapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}