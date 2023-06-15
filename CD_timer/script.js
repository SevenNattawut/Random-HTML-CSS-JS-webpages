(() => {
  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  const daySpan = document.getElementById("day");
  const hourSpan = document.getElementById("hour");
  const minuteSpan = document.getElementById("minute");
  const secondSpan = document.getElementById("second");

  const titleText = document.getElementById("yearNo");

  let thisYear;

  function countdown() {
    const now = new Date().getTime();
    const NY = new Date(`December 31, ${thisYear} 23:59:59`).getTime();

    const timeLeft = NY - now;

    daySpan.innerHTML = Math.floor(timeLeft / DAY);
    hourSpan.innerHTML = Math.floor((timeLeft % DAY) / HOUR);
    minuteSpan.innerHTML = Math.floor((timeLeft % HOUR) / MINUTE);
    secondSpan.innerHTML = Math.floor((timeLeft % MINUTE) / SECOND);
  }

  function setTitle() {
    titleText.innerHTML = "&nbsp;" + (thisYear + 1) + "&nbsp;";
  }

  function run() {
    // initialize the timer (no need to wait for the interval when loading the page)
    thisYear = new Date().getFullYear();
    countdown();
    setTitle();

    // update text every seconds
    setInterval(() => {
      thisYear = new Date().getFullYear();
      countdown();
      setTitle();
    }, SECOND);
  }

  run();
})();
