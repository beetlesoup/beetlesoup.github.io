// Get the header image element
var headerImage = document.getElementById("headerimage");
var filterValue = document.getElementsByClassName("active")[0].innerHTML;

function changeHeaderImage(c) {
  
    // Set the src attribute of the header image based on the selected category
      if (filterValue === "animalbrain") {
        headerImage.src = "00/images/homepage-and-headers/articlehub/animalintel-crop.png";
        console.log("Setting header image for category 1");
      } else if (filterValue === "cogsci") {
        headerImage.src = "00/images/homepage-and-headers/articlehub/cogsci-crop.jpeg";
        console.log("Setting header image for category 2");
      } else if (filterValue === "microbiology") {
        headerImage.src = "00/images/homepage-and-headers/articlehub/microbiology1.jpeg";
        console.log("Setting header image for category 3");
      } else if (filterValue === "physics") {
        headerImage.src = "00/images/homepage-and-headers/articlehub/physics1.png";
        console.log("Setting header image for category 4");
      } else if (filterValue === "space") {
        headerImage.src = "00/images/homepage-and-headers/articlehub/space-crop.png";
        console.log("Setting header image for category 5");
      } else {
        headerImage.src = "00/images/homepage-and-headers/articlehub/articlehub3.jpeg";
        console.log("Setting header image for category all");
      }
    };
