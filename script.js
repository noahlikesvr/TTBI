function convertTextToImage() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  const textarea = document.querySelector("textarea");
  const text = textarea.value;

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      const binary = convertToBinary(text);
      const image = createImageFromBinary(binary);
      displayImage(image);
    };

    reader.readAsText(file);
  } else if (text) {
    const binary = convertToBinary(text);
    const image = createImageFromBinary(binary);
    displayImage(image);
  }
}

function convertToBinary(text) {
  let binary = "";

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const binaryCode = charCode.toString(2).padStart(8, "0");
    binary += binaryCode;
  }

  return binary;
}

function createImageFromBinary(binary) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const imageSize = Math.ceil(Math.sqrt(binary.length));

  canvas.width = imageSize;
  canvas.height = imageSize;

  for (let i = 0; i < binary.length; i++) {
    const x = i % imageSize;
    const y = Math.floor(i / imageSize);
    const color = binary[i] === "0" ? "red" : "blue";

    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  }

  return canvas.toDataURL();
}

function displayImage(imageData) {
  const imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = `<img src="${imageData}" alt="Converted Image">`;
}

let zoomLevel = 1;
const imageContainer = document.getElementById("imageContainer");

imageContainer.addEventListener("click", function (event) {
  if (event.ctrlKey) {
    // Zoom out when Ctrl + click
    zoomLevel -= 0.1;
  } else {
    // Zoom in when clicked
    zoomLevel += 0.1;
  }

  imageContainer.style.transform = `scale(${zoomLevel})`;
});
