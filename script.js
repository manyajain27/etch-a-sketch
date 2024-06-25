let isDragging = false,isRandom=false,isReset=false,isChosen=false,erase=false;
let r=0,b=0,g=0,size=16;
const grid = document.querySelector(".maingrid");
const randombutton=document.querySelector("#random");
const resetbutton=document.querySelector("#reset");
const sizebutton=document.querySelector("#size");
const pickbutton=document.querySelector("#pick");
const colorpick=document.querySelector("#favcolor");
const def=document.querySelector("#default");
const saveButton = document.querySelector("#save");
const eraseButton = document.querySelector("#erase");
function checkRandom(){
    const boxes = grid.querySelectorAll("div");
    boxes.forEach(box => {
        box.style.backgroundColor = "rgb(131, 164, 207)"; // Change to your default background color
    });
    randombutton.addEventListener("click",()=>{
        isRandom=true;
    })
}
function chooseColor(){
    pickbutton.addEventListener("click",()=>{
        isChosen=true;
        isRandom=false;
        isReset=false;
    })
}
randombutton.addEventListener("click", () => {
    const boxes = grid.querySelectorAll("div");
    isRandom = true;
    isReset = false;
    isChosen=false; // Reset the reset flag when random button is clicked
});

// Function to handle reset button click
resetbutton.addEventListener("click", () => {
    isReset = true;
    isChosen=false;
    isRandom = false; // Reset the random flag when reset button is clicked
    resetGrid();
});

def.addEventListener("click",()=>{
    gridSize(16);
})

function resetGrid() {
    // Reset all box colors to default when reset button is clicked
    const boxes = grid.querySelectorAll("div");
    boxes.forEach(box => {
        box.style.backgroundColor = "rgb(131, 164, 207)"; // Change to your default background color
    });
}
sizebutton.addEventListener("click", () => {
    isReset = true;
    resetGrid();
    
    size = parseInt(prompt("Enter grid size (1-64)"));
    if(size>64){
        size=parseInt(prompt("enter valid grid size from (1-64)"))
    }
        
        gridSize(size);
    
});
eraseButton.addEventListener("click",()=>{
    erase=true;
    isReset=false;
    isChosen=false;
    isRandom=false;
})
function handleBoxAction(box) {
    if (isRandom) {
        fillRandom(box);
    } else if (isChosen) {
        fillChosen(box);
    } else if (erase) {
        fillErase(box);
    } else {
        fillDefault(box);
    }
}
function gridSize(size) {
    grid.innerHTML = "";
    for (let i = 1; i <= size * size; i++) {
        
        const box = document.createElement("div");
        box.style.border="1px solid black"
        box.style.boxSizing="border-box";
        box.style.width = `${640 / size}px`;
        box.style.height = `${640 / size}px`;
        grid.appendChild(box);
        checkRandom();
        chooseColor();
        
        // Event listeners for drag functionality
        box.addEventListener("mousedown", () => {
            isDragging = true;
            handleBoxAction(box);
        });

        box.addEventListener("mouseover", () => {
            if (isDragging) {
               handleBoxAction(box)// Fill during mouseover if dragging
            }
        });

        box.addEventListener("mouseup", () => {
            isDragging = false;
        });
        
    }
    
    
}

function fillDefault(box) {
    box.style.backgroundColor = "black";
}
function fillErase(box){
    box.style.backgroundColor = "rgb(131, 164, 207)";
}
function fillRandom(box){
    r=Math.floor(Math.random()*256);
    g=Math.floor(Math.random()*256);
    b=Math.floor(Math.random()*256);
    box.style.backgroundColor=`rgb(${r},${g},${b})`;
}
function fillChosen(box) {
    const chosenColor = colorpick.value;
    box.style.backgroundColor = chosenColor;
}
//save
saveButton.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Calculate grid size based on grid dimensions (assuming square grid)
    const gridSize = grid.offsetWidth; 
    const numBoxes = Math.sqrt(grid.querySelectorAll("div").length);
    const boxSize = gridSize / numBoxes;

    // Set canvas dimensions
    canvas.width = gridSize;
    canvas.height = gridSize;

    // Set canvas background color
    ctx.fillStyle = "rgb(131, 164, 207)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw each grid box onto the canvas
    grid.querySelectorAll("div").forEach((box, index) => {
        const row = Math.floor(index / numBoxes);
        const col = index % numBoxes;
        const boxColor = box.style.backgroundColor;
        ctx.fillStyle = boxColor;
        ctx.fillRect(col * boxSize, row * boxSize, boxSize, boxSize);
    });

    // Convert canvas to image data URL
    const image = canvas.toDataURL("image/png");

    // Create a download link for the image
    const link = document.createElement("a");
    link.href = image;
    link.download = "etch-a-sketch.png";
    link.click();
});

gridSize(size); 
