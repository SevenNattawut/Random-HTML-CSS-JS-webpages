(() => {
    const moon = document.querySelector(".moon");
    const input = document.getElementById("title-text");
    const msg = document.getElementById("msg");
    const displayText = document.querySelector(".display-text");
    const head = document.querySelector(".headArea");
    const hpText = document.querySelector(".hp-text");
    const bottomDiv = document.querySelector(".bottom");

    function parallaxFx() {
        let currentY = window.scrollY;
        // moon
        if (currentY >= 350) {
            moon.style.transform = `translate(${(currentY-350) * 0.7}%, ${(currentY-350) * -0.5}%)`;
        }
        // text
        if (currentY >= 200 && currentY < 1000) {
            displayText.style.transform = `translate(-50%, ${(currentY-200) * -0.25}%)`;
        }
        if (currentY >= 1150) {
            var opacity = 1 - ((currentY - 1150) / 400);
            displayText.style.opacity = opacity;
        }
        if (currentY >= 5000) {
            var opacity = ((currentY - 5400) / 150);
            bottomDiv.style.opacity = opacity;
        }
    }

    function updateText() {
        msg.innerText = `${input.value}`;
    }

    function updateTextHp(event) {
        if (event.type === "mouseover") {
            hpText.innerText = "Have a good day :D";
        } else if (event.type === "mouseout") {
            hpText.innerText = "hover on her head to headpat";
        }
    }


    function run() {
        document.addEventListener("scroll", parallaxFx);
        input.addEventListener("input", updateText);
        head.addEventListener("mouseover", updateTextHp);
        head.addEventListener("mouseout", updateTextHp);
    }

    run();
})();