// Get the header image element
var headerImage = document.getElementById("headerimage");


function changeHeaderImage() {
    var filterValue = document.getElementsByClassName("active")[0].innerHTML;

    // Set the src attribute of the header image based on the selected category
      if (filterValue === "Animal Intelligence") {
        headerImage.src = "00/images/homepage-and-headers/articlehub/animalintel-crop.png";
        console.log("Setting header image for category 1");
      } else if (filterValue === "Cognitive Science" || filterValue === "Human" || filterValue === "Other Animal") {
        headerImage.src = "00/images/homepage-and-headers/articlehub/cogsci-crop.jpeg";
        console.log("Setting header image for category 2");
      } else if (filterValue === "Microbiology") {
        headerImage.src = "00/images/homepage-and-headers/articlehub/microbiology1.jpeg";
        console.log("Setting header image for category 3");
      } else if (filterValue === "Physics") {
        headerImage.src = "00/images/homepage-and-headers/articlehub/physics1.png";
        console.log("Setting header image for category 4");
      } else if (filterValue === "Space") {
        headerImage.src = "00/images/homepage-and-headers/articlehub/space-crop.png";
        console.log("Setting header image for category 5");
      } else {
        headerImage.src = "00/images/homepage-and-headers/articlehub/articlehub3.jpeg";
        console.log("Setting header image for category all");
      }
    };
