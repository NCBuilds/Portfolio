const toolsList = document.getElementById('toolsList');
const searchBar = document.getElementById('searchBar');
const sortx = document.getElementById('sort');
const category = document.getElementById('category');
let hptools = [];

const loadtools = async () => {
    try {
        const res = await fetch('data/tools.json');
        hptools = await res.json();
        displaytools(hptools);
    } catch (err) {
        console.error(err);
    }
};

searchBar.addEventListener, searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredtools = hptools.filter((tool) => {
        return (
            tool.name.toLowerCase().includes(searchString) ||
            tool.discription.toLowerCase().includes(searchString) ||
            tool.tag.toLowerCase().includes(searchString) ||
            tool.type.toLowerCase().includes(searchString)
        );
    });
    displaytools(filteredtools);
});

const displaytools = (tools) => {
    const htmlString = tools
        .map((tool) => {
            return `
            <div class="card" style="background-image: url('${tool.image}');background-position: center">
                <div class="card-body">
                    <h2 class="card-title">${tool.name}</h2>
                    <p>${tool.discription}</p>
                    <a href="${tool.link}" class="button">Meer info</a>
                </div>
            </div>
        `;
        })
        .join('');
    toolsList.innerHTML = htmlString;
};

loadtools();

