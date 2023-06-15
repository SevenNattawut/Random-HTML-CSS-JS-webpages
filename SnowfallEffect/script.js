(() => {
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

    function createSnowFx(canvas, numOfSnow) {
        return [...Array(numOfSnow)].map(() => {
            return {
                x: rand(0, canvas.width),
                y: rand(0, canvas.height),
                oppacity: rand(0.5,1),
                radius: rand(3,10),
                speedX: rand(-1,1),
                speedY: rand(0.8,2)
            }
        });
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
        
        if (snow.y > canvas.height) {
            snow.y = 0;
        }

    }

    function run() {
        const {canvas, canvasContext, numOfSnow} = setup();
        const snowBalls = createSnowFx(canvas, numOfSnow);
        
    
        setInterval(() => {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            snowBalls.forEach((snow) => drawSnow(canvasContext, snow));
            snowBalls.forEach((snow) => moveSnow(canvas, snow));
        }, 10)
    }

    run()
})();