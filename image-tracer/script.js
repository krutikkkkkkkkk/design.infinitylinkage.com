window.onload = function(){
  var imageSelect = document.getElementById("imageSelect"),
      imageInput = document.getElementById("imageInput");  
  imageSelect.addEventListener("click", function (e) {
    imageInput.click();
    e.preventDefault();
  }, false);
  
  imageInput.addEventListener("change", function (e) {
    handleFiles(this.files);
  }, false);
  

//   document.getElementById("run").addEventListener("click", function (e) {
//     Potrace.loadImageFromUrl("open.jpg");
//     Potrace.process(function(){
//       displayImg();
//       displaySVG(3);
//     });
//   }, false);
  
  document.getElementById("save").addEventListener("click", function (e) {
	 e.target.download = "potrace" + (new Date()).toLocaleTimeString() + ".svg";
	 e.target.href = "data:image/svg+xml;," + Potrace.getSVG(.6);
  }, false);  
  
  var drop = document.getElementById('drop');
  drop.addEventListener("dragenter", function (e) {
    if (e.preventDefault) e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    this.classList.add('hovering');
    return false;
  }, false);
  
  drop.addEventListener("dragleave", function (e) {
    if (e.preventDefault) e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    this.classList.remove('hovering');
    return false;
  }, false);
  
  drop.addEventListener("dragover", function (e) {
    if (e.preventDefault) e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    this.classList.add('hovering');
    return false;
  }, false);
  
  drop.addEventListener("drop", function (e) {
    if (e.preventDefault) e.preventDefault();
    this.classList.remove('hovering');
    handleFiles(e.dataTransfer.files);
    return false;
  }, false);
};



function handleFiles(files) {
  Potrace.loadImageFromFile(files[0]);
  Potrace.process(function(){
    displayImg();
    displaySVG(.3);
  });
}

function displayImg(){
  var imgdiv = document.getElementById('imgdiv');
  imgdiv.style.display = 'inline-block';
  imgdiv.innerHTML = "<p>Input image:</p>";
  imgdiv.appendChild(Potrace.img);
}

function displaySVG(size, type){
  var svgdiv = document.getElementById('svgdiv');
  svgdiv.style.display = 'inline-block';
  svgdiv.innerHTML =  Potrace.getSVG(size, type);
}

