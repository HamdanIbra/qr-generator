const generateBtn = document.getElementById('generate');
const urlInput = document.getElementById('url');
const canvas = document.getElementById('qrcode');
const downloadLink = document.getElementById('download');
const linkOutput = document.getElementById('url-link');

function generateQRCode() {
  const url = urlInput.value.trim();

  if (!url) {
    alert("Please enter a URL");
    return;
  }

  QRCode.toCanvas(canvas, url, { width: 256 }, (error) => {
    if (error) {
      console.error(error);
      alert("Failed to generate QR code");
      return;
    }
    console.log("QR code generated!");

    // download link
    QRCode.toDataURL(url, { width: 256 }, (err, dataUrl) => {
      if (err) {
        console.error(err);
        return;
      }
      downloadLink.href = dataUrl;
      downloadLink.style.display = "inline-block";
    });

    // show clickable link
    linkOutput.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
  });

  // clear input
  urlInput.value = "";

  // change button text
  generateBtn.textContent = "Generate Another QR";
}

// Click event
generateBtn.addEventListener('click', generateQRCode);

// Enter key support
urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateQRCode();
  }
});
