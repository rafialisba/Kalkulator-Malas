document.addEventListener("DOMContentLoaded", function () {
  const outputElement = document.getElementById("output");
  let currentInput = "";

  function updateDisplay(value) {
    outputElement.innerText = value;
  }

  document.getElementById("clear").addEventListener("click", () => {
    currentInput = "";
    updateDisplay("0");
  });

  document.getElementById("back").addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
  });

  document.querySelectorAll(".input").forEach((button) => {
    button.addEventListener("click", () => {
      const buttonId = button.id;
      if (buttonId === "sum") {
        calculateResult();
      } else if (buttonId === "mod") {
        currentInput += "%";
      } else if (buttonId === "div") {
        currentInput += "/";
      } else if (buttonId === "mult") {
        currentInput += "*";
      } else if (buttonId === "sub") {
        currentInput += "-";
      } else if (buttonId === "add") {
        currentInput += "+";
      } else if (buttonId === ".") {
        currentInput += ".";
      } else if (/[0-9]/.test(buttonId)) {
        currentInput += buttonId;
      }
      updateDisplay(currentInput);
    });
  });

  function calculateResult() {
    try {
      const result = eval(currentInput.replace("%", "/100"));
      currentInput = result.toString();
      updateDisplay(result);
    } catch (error) {
      updateDisplay("Error");
      currentInput = "";
    }
  }
});
