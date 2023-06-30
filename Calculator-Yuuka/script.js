(() => {
    const n0 = document.getElementById("num0");
    const n1 = document.getElementById("num1");
    const n2 = document.getElementById("num2");
    const n3 = document.getElementById("num3");
    const n4 = document.getElementById("num4");
    const n5 = document.getElementById("num5");
    const n6 = document.getElementById("num6");
    const n7 = document.getElementById("num7");
    const n8 = document.getElementById("num8");
    const n9 = document.getElementById("num9");
    const add = document.getElementById("add");
    const sub = document.getElementById("dif");
    const mul = document.getElementById("mul");
    const div = document.getElementById("div");
    const dot = document.getElementById("dot");
    const equal = document.getElementById("equal");
    const del = document.getElementById("del");

    const display = document.getElementById("display");

    const rightSwitch = document.querySelector(".right-btn");
    const calBody = document.querySelector(".calculator-body");
    const calArea = document.querySelector(".cal-area");

    const topCap = document.getElementById("top");
    const botCap = document.getElementById("bottom");

    let displayVal = "";
    let turnOn = true;

    function addInput(event) {
        const btnContent = event.target.textContent;
        console.log(btnContent);

        if (displayVal === "Undefined") {
            displayVal = "";
        }

        if ((btnContent === "0" || (isNaN(btnContent) && btnContent !== "-")) && displayVal.length == 0) {
            // input nothing if the first char is 0 or operator (including C)
            new Audio("./asset/typing-fx.mp3").play()
            return;
        } else if ((btnContent === "+") && displayVal[displayVal.length-1] === "-" && displayVal.length == 1) {
            // if user press + when there is only - in display (negative), change to positive
            displayVal = "";
            new Audio("./asset/typing-fx.mp3").play()
        } else if ((btnContent === "-") && displayVal[displayVal.length-1] === "+") {
            // if user press + when there is + in right-most display (positive), change to negative
            displayVal = displayVal.slice(0, displayVal.length - 1) + btnContent;
            new Audio("./asset/typing-fx.mp3").play()
        } else if ((btnContent === "*" || btnContent === "/") && (displayVal[displayVal.length-1] === "*" || displayVal[displayVal.length-1] === "/")) {
            // if user press * or / after * or /, replace the operator
            displayVal = displayVal.slice(0, displayVal.length - 1) + btnContent;
            new Audio("./asset/typing-fx.mp3").play()
        }else if (btnContent === "C"){
            displayVal = ""
            new Audio("./asset/clear-fx.mp3").play()
        } else if (btnContent === "=") {
            let result = eval(displayVal);
            if (result == "Infinity") {
                result = "Undefined"
            } else if (!Number.isInteger(result)) {
                result = result.toFixed(3);
            } else {
            }
            displayVal = result.toString();
            new Audio("./asset/eval-fx.mp3").play()
        } else {
            displayVal += btnContent;
            new Audio("./asset/typing-fx.mp3").play()
        }
        display.innerHTML = displayVal;
    }

    // fold calculator
    function closeCal() {
        if (turnOn === true) {
            rightSwitch.style.marginLeft = "280px";
            topCap.classList.toggle("top");
            topCap.classList.toggle("top-on");
            botCap.classList.toggle("bottom");
            botCap.classList.toggle("bottom-on");
            setTimeout(() => calBody.style.opacity = "0", 300);
            setTimeout(() => calBody.style.display = "none", 1300);
            setTimeout(() => {
                calArea.style.height = "24px"
                turnOn = false;
            }, 1300);
        }
    }

    // unfold calculator
    function openCal() {
        if (turnOn === false) {
            topCap.classList.toggle("top");
            topCap.classList.toggle("top-on");
            botCap.classList.toggle("bottom");
            botCap.classList.toggle("bottom-on");
            setTimeout(() => calArea.style.height = "600px", 100);
            setTimeout(() => calBody.style.display = "flex", 300);
            setTimeout(() => calBody.style.opacity = "1", 400);
            setTimeout(() => {
                rightSwitch.style.marginLeft = "330px"
                turnOn = true;
            }, 1300);
        }
    }

    function run() {
        closeCal();
        n0.addEventListener("click", addInput);
        n1.addEventListener("click", addInput);
        n2.addEventListener("click", addInput);
        n3.addEventListener("click", addInput);
        n4.addEventListener("click", addInput);
        n5.addEventListener("click", addInput);
        n6.addEventListener("click", addInput);
        n7.addEventListener("click", addInput);
        n8.addEventListener("click", addInput);
        n9.addEventListener("click", addInput);
        add.addEventListener("click", addInput);
        sub.addEventListener("click", addInput);
        mul.addEventListener("click", addInput);
        div.addEventListener("click", addInput);
        dot.addEventListener("click", addInput);
        equal.addEventListener("click", addInput);
        del.addEventListener("click", addInput);
        rightSwitch.addEventListener("click", closeCal);
        topCap.addEventListener("click", openCal);
        botCap.addEventListener("click", openCal);

    }

    run()
})();
