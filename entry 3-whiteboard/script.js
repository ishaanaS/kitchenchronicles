document.addEventListener('DOMContentLoaded', function() {

  const draggableImages = document.querySelectorAll('.draggable');

    draggableImages.forEach(img => {
        img.addEventListener('dragstart', handleDragStart);
        img.addEventListener('dragend', handleDragEnd);
    });

    function handleDragStart(e) {
        // Set the data transfer effect and store the image being dragged
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', null); // For Firefox compatibility
        this.style.opacity = '0.4'; // Optional: make it semi-transparent while dragging
    }
    function handleDragEnd(e) {
      this.style.opacity = '1'; // Reset opacity after dragging
  }

  document.addEventListener('dragover', function(e) {
      e.preventDefault(); // Prevent default behavior to allow dropping
  });

  document.addEventListener('drop', function(e) {
      e.preventDefault(); // Prevent default behavior on drop
      const img = document.querySelector('.draggable[style*="opacity: 0.4"]'); // Find the dragged image
      if (img) {
          // Calculate new position
          const x = e.clientX - img.clientWidth / 2; // Center the image at cursor
          const y = e.clientY - img.clientHeight / 2;
            img.style.position = 'absolute'; // Set position to absolute
            img.style.left = `${x}px`; // Set new left position
            img.style.top = `${y}px`; // Set new top position
        }
      });
   
    const MAIN_MOUSE_BUTTON = 0;

function prepareContext(canvasElement) {
  let dpr = window.devicePixelRatio || 1;
  let rect = canvasElement.getBoundingClientRect();
  canvasElement.width = rect.width * dpr;
  canvasElement.height = rect.height * dpr;
 
  let context = canvasElement.getContext("2d");
  context.scale(dpr, dpr);
  
  return context;
}

function setLineProperties(context) {
  context.lineWidth = 4;
  context.lineJoin = "round";
  context.lineCap = "round";
  return context;
}

let clearButton = document.querySelector('.image');
let theCanvas = document.getElementById("theCanvas");
let theContext = prepareContext(theCanvas);
let shouldDraw = false;

theCanvas.addEventListener("mousedown", start);
theCanvas.addEventListener("mouseup", end);
theCanvas.addEventListener("mousemove", move, false);

clearButton.addEventListener("click", event => {
  clearCanvas(theContext);
});

let currentColor = 'black';

const colorButtons = document.querySelectorAll('.color-button');
colorButtons.forEach(button => {
  button.addEventListener('click', function() {
    currentColor = this.dataset.color;
    theContext.strokeStyle = currentColor;
  });
});

function setLineProperties(context) {
  context.lineWidth = 4;
  context.lineJoin = "round";
  context.lineCap = "round";
  context.strokeStyle = currentColor;
  return context;
}

 
function clearCanvas(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);  
}

function start(event) {
  if (event.button === MAIN_MOUSE_BUTTON) {
    shouldDraw = true;
    setLineProperties(theContext);

    theContext.beginPath();
    
    let elementRect = event.target.getBoundingClientRect();
    theContext.moveTo(event.clientX - elementRect.left, event.clientY - elementRect.top);
  }
}

function end(event) {
  if (event.button === MAIN_MOUSE_BUTTON) {
    shouldDraw = false;
  }
}

function move(event) {
  if (shouldDraw) {
    let elementRect = event.target.getBoundingClientRect();
    theContext.lineTo(event.clientX - elementRect.left, event.clientY - elementRect.top);
    theContext.stroke()
  }
}
});