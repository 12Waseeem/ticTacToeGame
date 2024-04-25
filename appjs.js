// Select all buttons with class "btn"
let boxes = document.querySelectorAll(".btn"); 

// Select the winner message element by ID
let msg = document.querySelector("#winner");

// Initialize the turn variable to true, indicating player "0" starts first
let turn = true; // person
const start = document.querySelector(".start");

function letStart() {
    msg.innerText = "";
}
function reStart() {
    msg.innerText = "Lets Play The Game!";
}
// Add event listener to the document
document.addEventListener("click", function() {
    start.innerText="";
});


// Select all reset buttons with class "reset"
let resetButtons = document.querySelectorAll(".reset");
//resetButtons.addEventListener("click", reStart());
// Add event listeners to each reset button
resetButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Reset the game state when the reset button is clicked
        for (box of boxes) {
            msg.style.visibility = "visible";
            box.innerText = ""; // Clear the text of each button
            box.disabled = false; // Enable each button
            msg.innerText = "Lets Play The Game!"; // Clear the winner message
            turn = true; // Reset the turn to player "0"
        }
    });
});

// Define the winning patterns
let winPatterns = [
    [0, 1, 2], // Top row
    [0, 3, 6], // First column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [1, 4, 7], // Second column
    [2, 5, 8], // Third column
    [3, 4, 5], // Middle row
    [6, 7, 8]  // Bottom row
];
// Function to display the winner message
function showWinner(person){
    msg.innerText = `Congratulation, Winner is ${person}`; // Set the text of the winner message
    msg.style.visibility = "visible"; // Make the winner message visible
}

// Function to check for a draw match
let checkDrawMatch = () => {
    // Check if all boxes are filled
    for (let box of boxes) {
        // If any box is empty, return false (game is not a draw)
        if (!box.innerText) {
            return false;
        }
    }
    // If all boxes are filled and no player has won, it's a draw
    return true;
};

// Add click event listeners to each button
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Check whose turn it is and mark the button accordingly
        if (turn) {
            //for turn
            msg.style.visibility = "visible";
            msg.innerText="Turn of X";
            box.innerText = "0"; // Mark the button with "0" for player "0"
            box.style.color = "blue"; // Set the text color to blue
            turn = false; // Switch turns to player "X"
        } else {
            msg.style.visibility = "visible";
            msg.innerText="Turn of O";
            box.innerText = "X"; // Mark the button with "X" for player "X"
            box.style.color = "purple"; // Set the text color to purple
            turn = true; // Switch turns to player "0"
        }

        box.disabled = true; // Disable the clicked button
        checkWinner();
        if (checkDrawMatch()) {
          msg.innerText="It's a draw!";
        }
         // Check if there's a winner after each move
    });
});

// Function to check for a winner
const checkWinner = () => {
    for (pattern of winPatterns) {
        let posVal1 = boxes[pattern[0]].innerText; // Get the text of the first position in the pattern
        let posVal2 = boxes[pattern[1]].innerText; // Get the text of the second position in the pattern
        let posVal3 = boxes[pattern[2]].innerText; // Get the text of the third position in the pattern
        if (posVal1 !== "" && posVal2 !== "" && posVal3 !== "") { // Check if all positions are filled
            if (posVal1 === posVal2 && posVal2 === posVal3) { // Check if all positions have the same text
                showWinner(posVal1); // Display the winner message
                for (box of boxes) {
                    box.disabled = true; // Disable all buttons
                }
            }
        }
    }
};
