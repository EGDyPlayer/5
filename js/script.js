const getStarted = document.getElementById("titleButton");

const scrollOffsets = {
    navHome:"header",
    navProjects: "projectsContainer"
};

function clickNav(buttonId) {
    const button = document.getElementById(buttonId);

    button.style.cssText = `
        scale: .95;
        text-decoration: underline;
        border-bottom: 5px solid #fff;
    `;
    const target = document.getElementById(scrollOffsets[buttonId])
    if (target) {
        target.scrollIntoView()
    }
    setTimeout(resetNav, 200);

    function resetNav() {
        button.style.cssText = ``;
    }
}
