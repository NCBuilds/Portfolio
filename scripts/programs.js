const programsList = document.getElementById('programsList');
const searchBar = document.getElementById('searchBar');
let hpprograms = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredprograms = hpprograms.filter((program) => {
        return (
            program.name.toLowerCase().includes(searchString) ||
            program.manufacturer.toLowerCase().includes(searchString) ||
            program.tag.toLowerCase().includes(searchString) ||
            program.type.toLowerCase().includes(searchString) 
        );
    });
    displayprograms(filteredprograms);
});

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
                    <li class="program"><img src="${program.src}"></img></li>
                    <div class="bottom"><p>${program.name}</p></div>
                    <br>
                    <progress id="skill" value="${program.skill}" max="100"> 0% </progress>           
                </div>
            </a>
        `;
        })
        .join('');
    programsList.innerHTML = htmlString;
};

loadprograms();