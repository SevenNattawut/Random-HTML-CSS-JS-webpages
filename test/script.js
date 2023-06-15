(() => {
    const text = document.getElementById("textInput");
    const red = document.getElementById("red");
    const green = document.getElementById("green");
    const blue = document.getElementById("blue");
    const outputDiv = document.getElementById("output");

    function createResult() {
        outputDiv.innerText = `${text.value}`;

        outputDiv.style.border = `5px solid rgb(${parseInt(red.value)},${parseInt(green.value)},${parseInt(blue.value)})`;
        outputDiv.style.color = `rgb(${parseInt(red.value)},${parseInt(green.value)},${parseInt(blue.value)})`;
    }

    function run() {
        text.addEventListener("input", createResult);
        red.addEventListener("input", createResult);
        green.addEventListener("input", createResult);
        blue.addEventListener("input", createResult);
    }

    run();
})();