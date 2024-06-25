let isDragging = false,isRandom=false,isReset=false,isChosen=false;
let r=0,b=0,g=0,size=16;
const grid = document.querySelector(".maingrid");
const randombutton=document.querySelector("#random");
const resetbutton=document.querySelector("#reset");
const sizebutton=document.querySelector("#size");
const pickbutton=document.querySelector("#pick");
const colorpick=document.querySelector("#favcolor");
const def=document.querySelector("#default");
function checkRandom(){
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
    
    size = parseInt(prompt("Enter grid size (1-100)"));
        
        gridSize(size);
    
});

function gridSize(size) {
    grid.innerHTML = '';
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
            if(isRandom===true){
                fillRandom(box);
            }
            else if(isChosen){
                fillChosen(box);
            }
            else{
            fillDefault(box);
            }
        });

        box.addEventListener("mouseover", () => {
            if (isDragging) {
                if(isRandom===true){
                    fillRandom(box);
                }
                else if(isChosen){
                    fillChosen(box);
                }
                else{
                fillDefault(box);
                } // Fill during mouseover if dragging
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
gridSize(size); 
