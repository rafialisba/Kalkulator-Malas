document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  let currentInput = "";
  let lastOperator = "";
  let firstOperand = "";

  const updateOutput = (value) => {
    output.textContent = value || "0";
  };

  const clearAll = () => {
    currentInput = "";
    firstOperand = "";
    lastOperator = "";
    updateOutput("");
  };

  const backspace = () => {
    currentInput = currentInput.slice(0, -1);
    updateOutput(currentInput);
  };

  const handleInput = (value) => {
    if (value === "." && currentInput.includes(".")) return;
    currentInput += value;
    updateOutput(currentInput);
  };

  const handleOperator = (operator) => {
    if (currentInput === "" && firstOperand === "") return;
    if (firstOperand === "") {
      firstOperand = currentInput || "0";
    } else if (currentInput !== "") {
      firstOperand = calculate(firstOperand, currentInput, lastOperator);
    }
    lastOperator = operator;
    currentInput = "";
    updateOutput(firstOperand);
  };

  const calculate = (a, b, operator) => {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    switch (operator) {
      case "add":
        return (num1 + num2).toString();
      case "sub":
        return (num1 - num2).toString();
      case "mult":
        return (num1 * num2).toString();
      case "div":
        return num2 !== 0 ? (num1 / num2).toString() : "Error";
      case "mod":
        return (num1 % num2).toString();
      default:
        return b;
    }
  };

  const handleEqual = () => {
    if (currentInput !== "" && firstOperand !== "") {
      currentInput = calculate(firstOperand, currentInput, lastOperator);
      firstOperand = "";
      lastOperator = "";
      updateOutput(currentInput);
    }
  };

  document.querySelectorAll(".input").forEach((button) => {
    button.addEventListener("click", (e) => {
      const value = e.target.dataset.value;
      const action = e.target.dataset.action;

      if (value !== undefined) {
        handleInput(value);
      } else if (action) {
        switch (action) {
          case "clear":
            clearAll();
            break;
          case "back":
            backspace();
            break;
          case "sum":
            handleEqual();
            break;
          default:
            handleOperator(action);
            break;
        }
      }
    });
  });
});
