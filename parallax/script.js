(() => {
    const moon = document.querySelector(".moon");
    const input = document.getElementById("title-text");
    const msg = document.getElementById("msg");
    const displayText = document.querySelector(".display-text");

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
        if (currentY >= 1010) {
            var opacity = 1 - ((currentY - 1010) / 400);
            displayText.style.opacity = opacity;
          }
    }

    function updateText() {
        msg.innerText = `${input.value}`;
    }


    function run() {
        document.addEventListener("scroll", parallaxFx);
        input.addEventListener("input", updateText);
    }

    run();
})();