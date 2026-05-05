import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNew, setWaitingForNew] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNew) {
      setDisplay(num);
      setWaitingForNew(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = performCalculation(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNew(true);
  };

  const performCalculation = (
    prev: number,
    current: number,
    op: string,
  ): number => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "*":
        return prev * current;
      case "/":
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    const currentValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = performCalculation(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNew(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNew(false);
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{display}</div>
      <div className="calculator-buttons">
        <button onClick={handleClear} className="button clear">
          C
        </button>
        <button
          onClick={() => handleOperation("/")}
          className="button operator"
        >
          ÷
        </button>
        <button
          onClick={() => handleOperation("*")}
          className="button operator"
        >
          ×
        </button>

        {[7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(String(num))}
            className="button"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleOperation("-")}
          className="button operator"
        >
          −
        </button>

        {[4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(String(num))}
            className="button"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleOperation("+")}
          className="button operator"
        >
          +
        </button>

        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleNumber(String(num))}
            className="button"
          >
            {num}
          </button>
        ))}
        <button onClick={handleEquals} className="button equals">
          =
        </button>

        <button onClick={() => handleNumber("0")} className="button zero">
          0
        </button>
        <button onClick={() => handleNumber(".")} className="button">
          .
        </button>
      </div>
    </div>
  );
}

export default Calculator;
