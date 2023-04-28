const textInput = document.getElementById('textInput');
const fontContainer = document.getElementById('fontContainer');
const fontPermissionBtn = document.getElementById('fontPermissionBtn');

fontPermissionBtn.addEventListener('click', requestFontPermission);

async function requestFontPermission() {
  try {
    await document.fonts.ready;
    const fonts = await document.fonts.query().then(fonts => fonts.map(font => font.family));
    fontContainer.innerHTML = '';
    fonts.forEach(font => {
      const fontDiv = document.createElement('div');
      fontDiv.classList.add('font');
      const fontName = document.createElement('p');
      fontName.classList.add('font__name');
      fontName.textContent = font;
      fontDiv.appendChild(fontName);
      const fontPreview = document.createElement('p');
      fontPreview.classList.add('font__preview');
      fontPreview.textContent = textInput.value;
      fontPreview.style.fontFamily = font;
      fontDiv.appendChild(fontPreview);
      fontContainer.appendChild(fontDiv);
    });
  } catch (error) {
    console.log(error);
  }
}

textInput.addEventListener('input', () => {
  const fontPreviews = document.querySelectorAll('.font__preview');
  fontPreviews.forEach(fontPreview => {
    fontPreview.textContent = textInput.value;
  });
});
