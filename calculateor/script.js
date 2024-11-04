const buttons = document.querySelectorAll(".button");
const display = document.getElementById("display");

function updateDisplay(value) {
  display.textContent = value;
}
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.textContent;

    if (button.classList.contains("number")) {
      const currentDisplay = display.textContent;
      updateDisplay(
        currentDisplay === "0" ? buttonValue : currentDisplay + buttonValue
      );
    } else if (buttonValue === "C") {
      updateDisplay("0");
    } else if (buttonValue === ".") {
      if (!display.textContent.includes(".")) {
        updateDisplay(display.textContent + ".");
      }
    }
    console.log(buttonValue);
  });
});
console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
let myLet = 20;

console.log(myConst); // ReferenceError: Cannot access 'myConst' before initialization
const myConst = 30;
