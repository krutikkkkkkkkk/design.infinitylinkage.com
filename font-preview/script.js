// Get the form input and button elements
const formInput = document.querySelector('.form__input');
const formButton = document.querySelector('.form__button');

// Get the preview container element
const previewContainer = document.querySelector('.preview-container');

// Define an array to hold the names of all available fonts
let fonts = [];

// Function to get all available fonts on the user's device
async function getFonts() {
  try {
    // Ask for permission to access the list of available fonts
    await document.fonts.ready;

    // Get the list of all available fonts
    const allFonts = document.fonts;

    // Loop through each font in the list
    allFonts.forEach(font => {
      // If the font is not already in the fonts array, add it
      if (!fonts.includes(font.family)) {
        fonts.push(font.family);
      }
    });
  } catch (error) {
    console.log('Error:', error);
  }
}

// Function to create a font preview card and append it to the preview container
function createPreviewCard(fontName, text) {
  // Create a new div element to hold the font preview card
  const fontPreview = document.createElement('div');
  fontPreview.classList.add('font-preview');

  // Create a new heading element to display the font name
  const fontNameElement = document.createElement('h2');
  fontNameElement.classList.add('font-preview__name');
  fontNameElement.textContent = fontName;

  // Create a new paragraph element to display the preview text in the selected font
  const previewTextElement = document.createElement('p');
  previewTextElement.classList.add('font-preview__text');
  previewTextElement.textContent = text;
  previewTextElement.style.fontFamily = fontName;

  // Append the font name and preview text to the font preview card
  fontPreview.appendChild(fontNameElement);
  fontPreview.appendChild(previewTextElement);

  // Append the font preview card to the preview container
  previewContainer.appendChild(fontPreview);
}

// Function to handle form submission
function handleFormSubmit(event) {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();

  // Clear any previous font previews from the preview container
  previewContainer.innerHTML = '';

  // Get the text entered by the user in the form input
  const text = formInput.value;

  // Loop through each font in the fonts array and create a font preview card for it
  fonts.forEach(font => {
    createPreviewCard(font, text);
  });
}

// Call the getFonts function to get all available fonts on the user's device
getFonts();

// Add an event listener to the form button to handle form submission
formButton.addEventListener('click', handleFormSubmit);
