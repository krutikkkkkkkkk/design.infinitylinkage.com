async function logFontData() {
    try {
      const availableFonts = await window.queryLocalFonts();
      for (const fontData of availableFonts) {
        console.log(fontData.postscriptName);
        console.log(fontData.fullName);
        console.log(fontData.family);
        console.log(fontData.style);
      }
    } catch (err) {
      console.error(err.name, err.message);
    }
  }

  logFontData()