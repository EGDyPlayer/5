let position = 0;

function nextSlide() {
    position+=600;
    slide();
}

function previousSlide() {
    position-=600;
    slide();
}

function slide() {
    const slider = document.getElementById("slider");
    const property = position + "px";
    slider.style.backgroundPositionX = property;
}