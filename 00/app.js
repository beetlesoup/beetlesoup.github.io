/* JavaScript lets you make lil rookie mistakes and tries to read
   your typo. This is bad because Good Times Create Soft Men.
   Let's turn on strict mode. */
'use strict';


  // this is so fun buttons will work the first time you click them (not just subsequent times) - but you have to put disappearers in the class "poof", and use css .poof {display: inline;}
  window.onload = function() {
    var poofs = document.getElementsByClassName("poof");
    for (var i = 0; i < poofs.length; i++) {
      poofs[i].style.display = "none";
    }
    };

/* Adding an event handler: we have a button that says "Dark".
   How are we going to make it turn the theme dark? */

/* First use a query selector to get the button reference and call it 'switcher' */
const switcher = document.querySelector('.themebtn');

/* Next add the event handler for the click event */
switcher.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    const className = document.body.className;
    if(className == "light-theme") {
        this.textContent = "☀️";
    } else {
        this.textContent = "🌜";
    }

    /* Add the following message to be shown in Developer View, ya big nerd: */
    console.log('current class name: ' + className);
});

// ============================== USING FILTERDIV
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("catContainer");
var btns = btnContainer.getElementsByClassName("categorybutton");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}


// ============================= END OF FILTERDIV

// ======================================= READ MORE:

function readMore(button) {
  var btnText = button.innerHTML;
  var contentText = button.previousElementSibling;

  if (contentText.style.display === "none") {
    contentText.style.display = "inline";
    button.innerHTML = 'x';
  } else {
    contentText.style.display = "none";
    button.innerHTML = '▸';
  }
}


function expand(button) {
  var btnText = button.innerHTML;
  var contentText = button.nextElementSibling;

  if (contentText.style.display === "none") {
    contentText.style.display = "inline";
    button.innerHTML = 'ok, I get it';
  } else {
    contentText.style.display = "none";
    button.innerHTML = 'expand';
  }
}

// <span class="readmoremessage">regular magfool</span> reg reg reg <span class="poof readmorecontent">more more more more more more more more</span><button onclick="readMoreFunction(this)" class="readmorebutton">▸</button>

// ----------------------------------- translator

function translator(button) { //idk why it says (button)
  var btnText = button.innerHTML;
  var translated = []; // creates the variable "translated" that is an array
  var siblings = button.nextElementSibling;
  // the next part looks at the next element and if its of the class "translated" it will add it to the translated array
  while (siblings != null && siblings.classList.contains('translated')) {
    translated.push(siblings);
    siblings = siblings.nextElementSibling;
  }
  // i was not able to add the original button text to the array

  var currentIndex = translated.findIndex(function(element) {
    return element.innerHTML === btnText;
  });

  // Get the next index in the translated array (or wrap around to 0 if at the end)
  var nextIndex = (currentIndex + 1) % translated.length;

  // Set the button text to the next item in the translated array
  button.innerHTML = translated[nextIndex].innerHTML;
}

// ========================================== COLLAPSIBLE
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}



// =========================== WORD CLOUD:


const divs = document.querySelectorAll('article');
      let textContent = '';
      divs.forEach(div => {
        textContent += div.textContent;
      });
      
      const words = textContent.toLowerCase().split(/[^\w\d]+/).filter(word => word.length > 3 && !/\w*'\w*/.test(word));

      const commonWords = ['about', 'after', 'also', 'been', 'because', 'each', 'else', 'even', 'from', 'have', 'into', 'just', 'like', 'long', 'many', 'more', 'most', 'much', 'must', 'only', 'other', 'over', 'people', 'something', 'some', 'such', 'than', 'that', 'their', 'them', 'then', 'there', 'these', 'they', 'thing', 'things', 'this', 'thus', 'were', 'what', 'when', 'which', 'will', 'with', 'would', 'your'];
      const filteredWords = words.filter(word => {
        return !commonWords.includes(word) && isNaN(word);
      });
      const wordFrequencies = {};
      filteredWords.forEach(word => {
        if (word in wordFrequencies) {
          wordFrequencies[word]++;
        } else {
          wordFrequencies[word] = 1;
        }
      });
      
      const layout = d3.layout.cloud()
        .size([800, 600])
        .words(Object.keys(wordFrequencies).map(word => ({text: word, size: wordFrequencies[word] * 2})))
        .padding(5)
        .rotate(() => Math.round(Math.random()) * 90)
        .font('Impact')
        .fontSize(d => d.size)
        .on('end', draw);
      layout.start();
      
      function draw(words) {
        d3.select('#word-cloud')
          .append('svg')
          .attr('width', 800)
          .attr('height', 600)
          .append('g')
          .attr('transform', `translate(400, 300)`)
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => `${d.size}px`)
          .style('font-family', 'Impact')
          .style('fill', () => `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`)
          .attr('text-anchor', 'middle')
          .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
          .text(d => d.text);
      }