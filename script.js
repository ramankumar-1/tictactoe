// Author: Raman Kumar (github: ramankumar-1)

// Global Variable to count the number of clicks since the begining of game
var global_click_counter=0; 

// DOM element for the Playing Board
var playingBoard = document.getElementById("playing-board");

// DOM elements for all the 9 CELLS of the board
var c1=document.getElementById("c1");
var c2=document.getElementById("c2");
var c3=document.getElementById("c3");
var c4=document.getElementById("c4");
var c5=document.getElementById("c5");
var c6=document.getElementById("c6");
var c7=document.getElementById("c7");
var c8=document.getElementById("c8");
var c9=document.getElementById("c9");

// DOM element for the Result Display section
var resultDisplay = document.getElementById("result-display");

// Global variable for the boolean flag denoting whether Game has ENDED or NOT
var gameEnded = false;

// Function to check if the END OF THE GAME has been reached or not
// Returns the Winner (X or O) if the game has ended, otherwise returns the empty string ""
function endGame(){
    c1_val=c1.innerHTML;
    c2_val=c2.innerHTML;
    c3_val=c3.innerHTML;
    c4_val=c4.innerHTML;
    c5_val=c5.innerHTML;
    c6_val=c6.innerHTML;
    c7_val=c7.innerHTML;
    c8_val=c8.innerHTML;
    c9_val=c9.innerHTML;

    // A game ends if any of the rows, colums or the 2 diagonals are filled with same char ("X" or "0")

    // Checking in ROWS
    if (c1_val == c2_val && c2_val == c3_val && c1_val!= ""){
        return c1_val; 
    }
    else if(c4_val == c5_val && c5_val == c6_val && c4_val!=""){
        return c4_val;
    }
    else if(c7_val == c8_val && c8_val == c9_val && c7_val!=""){
        return c7_val;
    }

    // Checking in COLUMNS
    else if (c1_val == c4_val && c4_val == c7_val && c1_val!=""){
        return c1_val; 
    }
    else if(c2_val == c5_val && c5_val == c8_val && c2_val!=""){
        return c2_val;
    }
    else if(c3_val == c6_val && c6_val == c9_val && c3_val!=""){
        return c3_val;
    }

     // Checking in DIAGONALS
     else if (c1_val == c5_val && c5_val == c9_val && c1_val!= ""){
        return c1_val; 
    }
    else if(c3_val == c5_val && c5_val == c7_val && c3_val!=""){
        return c3_val;
    }

    else{
        // The game shall continue
        return "";  
    }
}

function cellClicked(cellId){
    clicked_cell= document.getElementById(cellId);

    // (If the clicked cell is ALREADY FILLED with either "X" or "0") OR (if the GAME ENDED) --> then return 
    if (clicked_cell.innerHTML.length >= 1 || gameEnded){
        return;  
    }

    if (global_click_counter%2 == 0){
        clicked_cell.innerHTML='X';
        clicked_cell.classList.add("x-cell");
    }
    else{
        clicked_cell.innerHTML='O';
        clicked_cell.classList.add("o-cell");
    }

    // Checking whether games has ENDED or NOT
    endGameStatus = endGame(); 
    if (endGameStatus !=""){
        gameEnded=true; 
        resultDisplay.innerHTML = "RESULT: "+endGameStatus+" is the winner !";
        return;
    }

    global_click_counter++; 

    // If the Move Counter reached 9, it indicates a DRAW
    if (global_click_counter==9){
        gameEnded=true;
        resultDisplay.innerHTML = "RESULT: Draw";
        return;
    }
}

// RESET function to clear all the cells of the board. Called when reset button is pressed. 
function reset(){
    all_cells = document.getElementsByClassName("cell");
    for (let i=0; i < all_cells.length; i++) {
        // Removing the X or 0 labels from all the cells
        all_cells[i].innerHTML = ""; 

        // Removing all the classes except CELL class
        all_cells[i].classList.value="cell"; 
    }

    // Also clearing the result display area
    resultDisplay.innerHTML="";
    global_click_counter=0; 

    // Reset the gameEnded variable to FALSE
    gameEnded=false; 
}

// The CLICK EVENT LISTENER which returns the ID of the CELL which has been clicked 
playingBoard.addEventListener("click", (e) => cellClicked(e.target.id)); 