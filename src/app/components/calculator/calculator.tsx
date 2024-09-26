"use client";
import styles from "./calculator.module.css"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Calculator() {
    const [currentOperand, setCurrentOperand] = useState("");
    const [previousOperand, setPreviousOperand] = useState("");
    const [operation, setOperation] = useState(null);
    const [history, setHistory] = useState([]);
    const router = useRouter();

    // Load history from local storage on initial render
    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem("Historial") || '[]');
        setHistory(storedHistory);
    }, []);

    const clear = () => {
        setCurrentOperand("");
        setPreviousOperand("");
        setOperation(null);
    };

    const deleteLast = () => {
        setCurrentOperand(currentOperand.toString().slice(0, -1));
    };

    const appendNumber = (number:string) => {
        if (number === "." && currentOperand.includes(".")) return;
        setCurrentOperand(currentOperand + number.toString());
    };

    const chooseOperation = (operation) => {
        if (currentOperand === "") return;
        if (previousOperand !== "") {
        compute();
        }
        setOperation(operation);
        setPreviousOperand(currentOperand);
        setCurrentOperand("");
    };

    const compute = () => {
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        let computation;
        switch (operation) {
        case "+":
            computation = prev + current;
            break;
        case "-":
            computation = prev - current;
            break;
        case "*":
            computation = prev * current;
            break;
        case "÷":
            computation = prev / current;
            break;
        default:
            return;
        }

        setCurrentOperand(computation);
        setOperation(null);
        setPreviousOperand("");
        const updatedHistory = [...history, computation];
        setHistory(updatedHistory);
        localStorage.setItem("Historial", JSON.stringify(updatedHistory));
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem("Historial");
    };

    const getDisplayNumber = (number) => {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
        integerDisplay = "";
        } else {
        integerDisplay = integerDigits.toLocaleString("en", {
            maximumFractionDigits: 0,
        });
        }
        if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
        } else {
        return integerDisplay;
        }
    };

    const handleLogout = () => {
        Cookies.remove("isAuth"); // Remove the session cookie
        router.push("/"); // Redirect to the login page
    };

    return (
    <div className={styles.calculadora}>
        
        <div className={styles.header}>
            <h1>Calculadora</h1>
        </div>
        <div className={styles.pantallaCalc}>
            <div className={styles.previousOperand}>
            {operation ? `${getDisplayNumber(previousOperand)} ${operation}` : ""}
            </div>
            <div className={styles.currentOperand}>{getDisplayNumber(currentOperand)}</div>
        </div>
        <div className={styles.botonesCalc}>
            <button onClick={clear} className={styles.clearBtn}>C</button>
            <button onClick={deleteLast} className={styles.boton}>⌫</button>
            <button onClick={() => chooseOperation("+")} className={styles.boton}>+</button>
            <button onClick={() => appendNumber("7")} className={styles.boton}>7</button>
            <button onClick={() => appendNumber("8")} className={styles.boton}>8</button>
            <button onClick={() => appendNumber("9")} className={styles.boton}>9</button>
            <button onClick={() => chooseOperation("-")} className={styles.boton}>-</button>
            <button onClick={() => appendNumber("4")} className={styles.boton}>4</button>
            <button onClick={() => appendNumber("5")} className={styles.boton}>5</button>
            <button onClick={() => appendNumber("6")} className={styles.boton}>6</button>
            <button onClick={() => chooseOperation("*")} className={styles.boton}>*</button>
            <button onClick={() => appendNumber("1")} className={styles.boton}>1</button>
            <button onClick={() => appendNumber("2")} className={styles.boton}>2</button>
            <button onClick={() => appendNumber("3")} className={styles.boton}>3</button>
            <button onClick={() => chooseOperation("÷")} className={styles.boton}>&divide;</button>
            <span></span>
            <button onClick={() => appendNumber("0")} className={styles.boton}>0</button>
            <button onClick={() => appendNumber(".")} className={styles.boton}>.</button>
            <button onClick={compute} className={styles.boton}>=</button>
            <button onClick={() => alert(history.join(", "))} className={styles.historyBtn}>History</button>
            <button onClick={clearHistory} className={styles.clearHistoryBtn}>Clear History</button>
            <span></span>
            <button className={styles.botonLogout} onClick={handleLogout}>Logout</button>
        </div>
    </div>
    )
}