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

    const equal = document.getElementById("equal");
    const del = document.getElementById("del");

    const display = document.getElementById("display");

    let displayVal = "";

    function addInput(event) {
        const btnContent = event.target.textContent;
        console.log(displayVal[displayVal.length-1]);
        if ((btnContent === "0" || isNaN(btnContent)) && displayVal.length == 0) {
            // inout nothing if the first char is 0 or operator (including C)
            return;
        } else if ((btnContent === "*" || btnContent === "/") && (displayVal[displayVal.length-1] === "*" || displayVal[displayVal.length-1] === "/")) {
            // if user press * or / after * or /, replace the operator
            displayVal = displayVal.slice(0, displayVal.length - 1) + btnContent;
        }else if (btnContent === "C"){
            displayVal = ""
        } else if (btnContent === "=") {
            let result = eval(displayVal);
            displayVal = result.toString();
        } else {
            displayVal += btnContent;
        }
        display.innerHTML = displayVal;
    }

    function run() {
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
        equal.addEventListener("click", addInput);
        del.addEventListener("click", addInput);
    }

    run()
})();