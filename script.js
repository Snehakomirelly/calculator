let display = document.getElementById("display");
let historyList = document.getElementById("historyList");

let history = [];

// INPUT
function appendValue(val) {
    display.value += val;
}

// CLEAR
function clearDisplay() {
    display.value = "";
}

// DELETE
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// CALCULATE
function calculateResult() {
    try {
        let exp = display.value;
        let result = eval(exp);

        display.value = result;

        history.push({ exp, result });
        updateHistory();

    } catch {
        display.value = "Error";
    }
}

// HISTORY UPDATE
function updateHistory() {
    historyList.innerHTML = "";

    history.slice().reverse().forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.exp} = ${item.result}`;

        // clickable reuse
        li.onclick = () => {
            display.value = item.exp;
        };

        historyList.appendChild(li);
    });
}

// CLEAR HISTORY
function clearHistory() {
    history = [];
    updateHistory();
}

// DARK MODE (FIXED)
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

/* KEYBOARD SUPPORT */
document.addEventListener("keydown", (e) => {
    if (
        (e.key >= "0" && e.key <= "9") ||
        ["+", "-", "*", "/", "."].includes(e.key)
    ) {
        appendValue(e.key);
    }

    if (e.key === "Enter") calculateResult();
    if (e.key === "Backspace") deleteLast();
    if (e.key === "Escape") clearDisplay();
});