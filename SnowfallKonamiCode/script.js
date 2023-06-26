(() => {

    const keyDisplay = document.querySelector(".key-input-show");

    function setup(){
        const canvas = document.getElementById("snow-layer");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        return {
            canvas,
            canvasContext: canvas.getContext("2d"),
            numOfSnow: 150
        }
    }

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateSnow(canvas) {
        return {
            x: rand(0, canvas.width),
            y: 0,
            oppacity: rand(0.5,1),
            radius: rand(3,10),
            speedX: rand(-1,1),
            speedY: rand(0.8,2)
        }
    }

    function drawSnow(canvasContext, snow) {
        canvasContext.beginPath();
        canvasContext.arc(snow.x, snow.y, snow.radius, 0, Math.PI*2);
        canvasContext.fillStyle = `rgba(255 ,255 , 255, ${snow.oppacity})`;
        canvasContext.fill();
    }

    function moveSnow(canvas, snow) {
        snow.x += snow.speedX;
        snow.y += snow.speedY;

        if (snow.x > canvas.width) {
            snow.x = 0;
        } else if (snow.x < 0) {
            snow.x = canvas.width;
        }

    }

    function removeSnow(i, snowBalls) {
        snowBalls.splice(i,1);
    }

    function createkeyDisplay(keyInput) {
        const newKey = document.createElement("div");
        newKey.className = "key-input";
        
        switch (keyInput) {
            case "ArrowUp":
                newKey.innerHTML = "&uarr;"
                break;
            case "ArrowDown":
                newKey.innerHTML = "&darr;"
                break;
            case "ArrowLeft":
                newKey.innerHTML = "&larr;"
                break;
            case "ArrowRight":
                newKey.innerHTML = "&rarr;"
                break;
            default:
                newKey.innerHTML = keyInput;
        }

        return newKey;

    }

    function run() {

        const konamiCombo = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;
        let runAnimation = false;

        const {canvas, canvasContext, numOfSnow} = setup();
        const snowBalls = [];
        
        function animate() {

            snowBalls.forEach((snow, index) => {
                if (snow.y > canvas.height) {
                    removeSnow(index, snowBalls);
                }
            });

            // generate snowball at random interval and as long as the amount of snow is less than numOfSnow && snowBalls.length < numOfSnow
            if (rand(0,1) > 0.7) {
                snowBalls.push(generateSnow(canvas))
            }

            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            snowBalls.forEach((snow) => drawSnow(canvasContext, snow));
            snowBalls.forEach((snow) => moveSnow(canvas, snow));

            // send function to requestAnimationFrame, or clear the snowBalls array (depend on runAnimation)
            if (runAnimation === true) {
                requestAnimationFrame(animate);
            } else {
                snowBalls.length = 0;
            }
        }

        document.addEventListener("keydown", (event) => {
            if (konamiIndex === 0) {
                keyDisplay.innerHTML = "";
            }
            keyDisplay.appendChild(createkeyDisplay(event.key));
            keyDisplay.classList.add("show");
            setTimeout(() => keyDisplay.classList.remove("show"), 1000);
        });

        // konami code
        document.addEventListener("keydown", (event) => {
            // check combo sequence, if user input right sequence, add konamiIndex, else, reset konamiIndex
            event.key === konamiCombo[konamiIndex] ? konamiIndex++ : konamiIndex = 0;

            if (runAnimation === false && konamiIndex === konamiCombo.length) {
                runAnimation = true;
                animate();
                konamiIndex = 0;
            }
            else if (runAnimation === true && konamiIndex === konamiCombo.length){
                runAnimation = false;
                animate();
                canvasContext.clearRect(0, 0, canvas.width, canvas.height);
                konamiIndex = 0;
            }
        });

    }

    run();
})();