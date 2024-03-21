console.log("-------file loaded-------");


// this is the classlist that toggles the class that takes away the cover
const controlBtn = document.querySelector(".controlsBtn");
controlBtn.addEventListener("click", function () {
  let coverUp = document.querySelector(".coverUp");
  coverUp.classList.toggle("coverGone");
});

const aboutMe = document.querySelector(".aboutMe");
aboutMe.addEventListener("click", function () {
  alert("de maker van dit spel is Bas van den Berg(17 jaar)\nuit klas B1m");
});

const extraInfo = document.querySelector(".extraInfo");
extraInfo.addEventListener("click", function () {
  alert("dacht je dat hier iets was??????");
});
