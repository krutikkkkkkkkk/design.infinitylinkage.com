// Select the form and canvas elements
const form = document.querySelector('#image-form');
const canvas = document.querySelector('#canvas');
const downloadLink = document.querySelector('#download-link');
const dlstat = document.querySelector('#dl-status');

// Add an event listener to the form submit event
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the base and overlay images from the input elements
  const baseImages = [...document.querySelector('#base-image').files];
  const overlayImage = document.querySelector('#overlay-image').files[0];
  dlstat.inerHTML = 'Processing... 10%';

  // Load the overlay image as an image object
  const overlay = await loadImage(overlayImage);

  // Create a zip file to hold the resulting images
  const zip = new JSZip();
  dlstat.inerHTML = 'Processing... 20%';

  // Loop through each base image and overlay them with the PNG
  for (const baseImage of baseImages) {
    // Load the base image as an image object
    const base = await loadImage(baseImage);

    // Set the canvas dimensions to match the base image dimensions
    canvas.width = base.width;
    canvas.height = base.height;
    dlstat.inerHTML = 'Processing... 60%';

    // Draw the base image onto the canvas
    canvas.getContext('2d').drawImage(base, 0, 0);

    // Draw the PNG overlay onto the canvas
    canvas.getContext('2d').drawImage(overlay, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a Blob object
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));

    // Add the resulting image to the zip file with a filename based on the original base image
    zip.file(baseImage.name.replace('.jpg', '') + '_overlayed.jpg', blob);
  }

  // Generate a blob from the zip file and create a URL to download it
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const zipUrl = URL.createObjectURL(zipBlob);
  dlstat.inerHTML = 'Processing... 90%';
  // Set the download link href attribute to the URL and enable it
  downloadLink.href = zipUrl;
  downloadLink.classList.remove('disabled')
  downloadLink.disabled = false;
  dlstat.inerHTML = 'Done 100%';

});

// A utility function to load an image file as an image object
function loadImage(imageFile) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to load image'));
    try{
      image.src = URL.createObjectURL(imageFile);
    }
    catch(err){
      console.log(err);
      alert('Error: ' + "Image not found");
    }
  });
}
