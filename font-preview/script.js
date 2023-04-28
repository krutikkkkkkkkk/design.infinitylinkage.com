const fontList = document.getElementById("font-list");
const textInput = document.getElementById("text-input");

// Ask for permission to access installed fonts
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    console.log("Fonts loaded");
  }).catch((err) => {
    console.error("Error loading fonts", err);
  });
} else {
  // Fallback for older browsers
  const permissionStatus = document.webkitPermissionRequest ? document.webkitPermissionRequest('font') : undefined;
  if (permissionStatus === undefined) {
    console.log("Permission request not supported");
  } else {
    permissionStatus.then(() => {
      console.log("Permission granted");
    }).catch(() => {
      console.log("Permission denied");
    });
  }
}

// Generate preview for all installed fonts
function generatePreview() {
  const fonts = document.fonts ? document.fonts : undefined;

  if (!fonts || !fonts.ready) {
    console.log("Fonts not available");
    return;
  }

  const text = textInput.value.trim();

  if (text.length === 0) {
    console.log("Empty text input");
    return;
  }

  fontList.innerHTML = "";

  fonts.ready.then(() => {
    console.log("Fonts loaded");

    fonts.forEach((font) => {
      const fontName = font.family;
      const fontPreview = document.createElement("li");
      fontPreview.classList.add("font-preview");

      const fontNameElem = document.createElement("p");
      fontNameElem.textContent = fontName;
      fontNameElem.style.fontFamily = fontName;

      const textElem = document.createElement("p");
      textElem.textContent = text;
      textElem.style.fontFamily = fontName;

      fontPreview.appendChild(fontNameElem);
      fontPreview.appendChild(textElem);
      fontList.appendChild(fontPreview);
    });
  }).catch((err) => {
    console.error("Error loading fonts", err);
  });
}

textInput.addEventListener("input", generatePreview);
