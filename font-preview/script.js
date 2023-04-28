async function updatePreview() {
    const userText = document.getElementById('user-text').value;
    const fontPreview = document.getElementById('font-preview');
    fontPreview.innerHTML = '';
  
    if (!('fonts' in document)) {
      fontPreview.innerHTML = 'Your browser does not support the FontFace API';
      return;
    }
  
    const permissionStatus = await navigator.permissions.query({ name: 'font-access' });
    if (permissionStatus.state !== 'granted') {
      const permissionResult = await navigator.permissions.request({ name: 'font-access' });
      if (permissionResult.state !== 'granted') {
        fontPreview.innerHTML = 'You did not grant permission to access the fonts';
        return;
      }
    }
  
    const fonts = await document.fonts.ready;
    const fontList = fonts.map(font => font.family);
  
    fontList.forEach(font => {
      const fontPreviewItem = document.createElement('div');
      fontPreviewItem.style.fontFamily = font;
      fontPreviewItem.textContent = userText;
      fontPreview.appendChild(fontPreviewItem);
    });
  }
  