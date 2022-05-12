const programsList = document.getElementById('programsList');
let hpprograms = [];

const loadprograms = async () => {
    try {
        const res = await fetch('data/programs.json');
        hpprograms = await res.json();
        displayprograms(hpprograms);
    } catch (err) {
        console.error(err);
    }
};

const displayprograms = (programs) => {
    const htmlString = programs
        .map((program) => {
            return `
            <a href="${program.site}" target="_blank">
            <div class="tooltip">
            <div class="card" id="program" style="background-image: url('${program.src}}')"></div>
            <progress id="skill" value="${program.skill}" max="100"> 0% </progress>           
            <span class="tooltiptext">${program.name}</span>
            </div>
            </a>
        `;
        })
        .join('');
    programsList.innerHTML = htmlString;
};

loadprograms();