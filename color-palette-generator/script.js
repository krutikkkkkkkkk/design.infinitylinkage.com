const colorPalette = document.getElementById("color-palette");
const generateButton = document.getElementById("generate-button");
let colors = [];


var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.addEventListener('change', function(){
  output.innerHTML = this.value;
})

function generateColor() {
  const hexChars = "0123456789ABCDEF";
  let hexCode = "#";
  for (let i = 0; i < 6; i++) {
    hexCode += hexChars[Math.floor(Math.random() * 16)];
  }
  return hexCode;
}

function generatePalette() {
  colors = [];
  colorPalette.innerHTML = "";
  for (let i = 0; i < slider.value; i++) {
    const color = generateColor();
    colors.push(color);
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("color");
    colorDiv.style.backgroundColor = color;
    colorDiv.addEventListener("click", function() {
      navigator.clipboard.writeText(color)
      .then(function() {
        colorDiv.classList.add("copied");
        setTimeout(function() {
          colorDiv.classList.remove("copied");
        }, 1000);
      })
      .catch(function(error) {
        console.log("Copy failed: ", error);
      });
    });
    colorPalette.appendChild(colorDiv);
  }
}

generatePalette();

generateButton.addEventListener("click", function() {
  generatePalette();
});