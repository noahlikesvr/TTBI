function convertTextToSVG() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  const textarea = document.querySelector("textarea");
  const text = textarea.value;

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      const binary = convertToBinary(text);
      const svg = createSVGFromBinary(binary);
      displaySVG(svg);
    };

    reader.readAsText(file);
  } else if (text) {
    const binary = convertToBinary(text);
    const svg = createSVGFromBinary(binary);
    displaySVG(svg);
  }
}

function createSVGFromBinary(binary) {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  const imageSize = Math.ceil(Math.sqrt(binary.length));

  svg.setAttribute("width", imageSize);
  svg.setAttribute("height", imageSize);

  for (let i = 0; i < binary.length; i++) {
    const x = i % imageSize;
    const y = Math.floor(i / imageSize);
    const color = binary[i] === "0" ? "red" : "blue";

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", 1);
    rect.setAttribute("height", 1);
    rect.setAttribute("fill", color);

    svg.appendChild(rect);
  }

  return svg;
}

function displaySVG(svg) {
  const imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = "";
  imageContainer.appendChild(svg);
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

let zoomLevel = 1;
const imageContainer = document.getElementById("imageContainer");

imageContainer.addEventListener("click", function (event) {
  const rect = imageContainer.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  if (event.ctrlKey) {
    // Zoom out when Ctrl + click
    zoomLevel = Math.max(zoomLevel - 0.35, 0.1);
  } else {
    // Zoom in when clicked
    zoomLevel += 0.35;
  }

  const scale = `scale(${zoomLevel})`;
  const translate = `translate(${-offsetX}px, ${-offsetY}px)`;
  imageContainer.style.transformOrigin = "top left";
  imageContainer.style.transform = `${translate} ${scale}`;
});

function zoomIn() {
  zoomLevel += 0.35;
  applyZoom();
}

function zoomOut() {
  zoomLevel = Math.max(zoomLevel - 0.35, 0.1);
  applyZoom();
}

function applyZoom() {
  const scale = `scale(${zoomLevel})`;
  imageContainer.style.transform = scale;
}

// Add event listeners to the buttons
const zoomInButton = document.getElementById("zoomInButton");
const zoomOutButton = document.getElementById("zoomOutButton");

zoomInButton.addEventListener("click", zoomIn);
zoomOutButton.addEventListener("click", zoomOut);

document.addEventListener("DOMContentLoaded", function () {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  if (isMobile) {
    showModal();
  }
});

function showModal() {
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.style.display = "flex";
}

function closeModal() {
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.style.display = "none";
}
