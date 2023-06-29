(() => {
    const calandarContent = document.getElementById("dateContent");
    const monthLabel = document.querySelector(".calandar-month");

    // root element (for time variables in css)
    const r = document.querySelector(":root");

    function getCurrentTime() {
        const currentTime = new Date();
        const timezoneOffset = currentTime.getTimezoneOffset() * 60000;
        const bangkokTime = new Date(currentTime.getTime() + timezoneOffset + (3600000 * 7));
        return bangkokTime;
    }

    // directly update animation delay in css based on current time
    function setHands() {
        const currentTime = getCurrentTime();
        const totalMilliseconds = currentTime.getTime() - currentTime.setHours(0, 0, 0, 0);
        r.style.setProperty("--sec", `-${totalMilliseconds}ms`);
        r.style.setProperty("--min", `-${totalMilliseconds}ms`);
        r.style.setProperty("--hr", `-${totalMilliseconds}ms`);
    }

    function setupCalandar() {
        const today = getCurrentTime();

        const monthList = ["Jauary", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const dateArray = [];

        monthLabel.innerHTML = `${monthList[today.getMonth()]} ${today.getFullYear()}`;

        // year, month (0 = Jan), date (0 = last day of last month)
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        let lastDayOfLastMonth = null;
        let sundayOfLastMonth = null;
        
        // if the first date is not Sunday -> find the sunday of last month
        if (firstDayOfMonth.getDay() !== 0) {
            lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            sundayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0 - lastDayOfLastMonth.getDay());
        }

        for (let i = 0; i < 42; i++) {
            dateArray.push(new Date(today.getFullYear(), today.getMonth(), 0 - lastDayOfLastMonth.getDay() + i))
        }

        let calandarHTML = ``;
        let k = 0;

        // assign calandar content
        for (let i = 0; i < 6; i ++) {
            let weekHTML = "";
            let notThisMonthCount = 0;

            weekHTML += `<div class="calandar-week">`;
            for (let j = 0; j < 7; j ++) {
                weekHTML += `<div class="calandar-day`;
                
                // today -> highlight
                if (dateArray[k].getDate() == today.getDate() && dateArray[k].getMonth() == today.getMonth()) {
                    weekHTML += ` today`;
                }

                // not in current month
                if (dateArray[k].getMonth() !== today.getMonth()) {
                    weekHTML += ` not-current-month">`;
                    notThisMonthCount++;
                } else {
                    weekHTML += `">`;
                }
                weekHTML += `${dateArray[k].getDate()}</div>`
                k++;
            }
            weekHTML += `</div>`

            // only accept the week that has the date of current month
            if (notThisMonthCount < 6) {
                calandarHTML += weekHTML;
            }
        }
        calandarContent.innerHTML = calandarHTML;
    }

    function run() {
        setHands();
        setupCalandar();
    }
    run();
})();