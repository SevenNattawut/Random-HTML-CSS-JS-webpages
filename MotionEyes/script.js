(() => {
  //code
  const CHARS = [
    {
      name: "chihiro",
    },
    {
      name: "kotama",
    },
    {
      name: "himari",
    },
    {
      name: "maki",
    },
    {
      name: "hare",
    },
  ];

  function updateEyeSize(characterId, eyeSize) {
    const characterEye = document
      .getElementById(characterId)
      .querySelectorAll(".eye");
    characterEye.forEach((eye) => {
      eye.style.width = eyeSize;
      eye.style.height = eyeSize;
    });
  }

  CHARS.forEach((char) => {
    updateEyeSize(char.name, char.eyeSize);
  });

  function run() {
    const bodyElem = document.querySelector("body");
    const eyeElems = document.querySelectorAll(".eye");

    function onMouseMove({ pageX, pageY }) {
      eyeElems.forEach((eyeElem) => {
        const { left, top } = eyeElem.getBoundingClientRect();

        const eyeCenterX = left + eyeElem.offsetWidth / 2;
        const eyeCenterY = top + eyeElem.offsetHeight / 2;

        // calculate angle using arctan and radian
        const radian = Math.atan2(pageX - eyeCenterX, pageY - eyeCenterY);

        const angle = ((radian * 180) / Math.PI) * -1;

        eyeElem.style.transform = `rotate(${angle}deg)`;
      });
    }

    // detect mouse movement
    bodyElem.addEventListener("mousemove", onMouseMove);
  }

  run();
})();
