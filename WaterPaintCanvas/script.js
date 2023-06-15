(() => {
    const canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");

    let previousPoint = {
        x: 0,
        y: 0
    };

    function paint({ pageX, pageY }) {
        const currPoint = { 
            x: pageX,
            y: pageY
        };

        const distance = getDistance(previousPoint, currPoint)/2;

        context.beginPath();
        context.lineCap = "round";
        context.lineJoin = "round";
        // set width and opacity based on distance value
        context.lineWidth = Math.random() / distance * 40;
        const opacity = Math.min((1/distance), 0.5);
        // set RGB color and opacity
        context.strokeStyle = `rgba(222, 10, 109, ${opacity})`;

        context.moveTo(previousPoint.x, previousPoint.y);
        context.lineTo(currPoint.x, currPoint.y);

        context.stroke();
        context.closePath();

        previousPoint = currPoint;
    }

    // set starting point
    function startPaint({ pageX, pageY }) {
        previousPoint = {
            x: pageX,
            y: pageY
        }
    }

    function getDistance(previousPoint, currPoint) {
        return Math.sqrt((previousPoint.x - currPoint.x) ** 2 + (previousPoint.y - currPoint.y) ** 2);
    }

    function run() {
        canvas.addEventListener("mousedown", startPaint);
        canvas.addEventListener("mouseup", stopPaint);
    }
    
    // handle mouse holding
    function startPaint(event) {
        // 0 represents the left mouse button press
        if (event.button === 0) { 
            canvas.addEventListener("mousemove", paint);
        }
    }
    
    function stopPaint() {
        canvas.removeEventListener("mousemove", paint);
    }

    run();
})();