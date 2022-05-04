const projectsList = document.getElementById('projectsList');
const searchBar = document.getElementById('searchBar');
const sortx = document.getElementById('sort');
const category = document.getElementById('category');
let hpprojects = [];

const loadprojects = async () => {
    try {
        const res = await fetch('data/projects.json');
        hpprojects = await res.json();
        displayprojects(hpprojects);
    } catch (err) {
        console.error(err);
    }
};

sortx.addEventListener('change', (e) => {
    var valueSelected = sortx.value;
    //alert("sort"+valueSelected);
    var items = [].concat(hpprojects); // copy array not a pointer
    if (valueSelected == 'name') {
        items.sort((a, b) => {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();
            if (fa < fb) {return -1;}
            if (fa > fb) {return 1;}
            return 0;
        })
    }
    if (valueSelected == 'categorie') {
        items.sort((a, b) => {
            let fa = a.type.toLowerCase(),
                fb = b.type.toLowerCase();
            if (fa < fb) {return -1;}
            if (fa > fb) {return 1;}
            return 0;
        })
    }
    if (valueSelected == 'datum v') {
        items.sort((a, b) => {
            return b.date - a.date;
        });
    }
    if (valueSelected == 'datum ^') {
        items.sort((a, b) => {
            return b.date - a.date;
        });
    }
    displayprojects(items);
});
  


searchBar.addEventListener, searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredprojects = hpprojects.filter((project) => {
        return (
            project.name.toLowerCase().includes(searchString) ||
            project.discription.toLowerCase().includes(searchString) ||
            project.tag.toLowerCase().includes(searchString) ||
            project.type.toLowerCase().includes(searchString)
        );
    });
    displayprojects(filteredprojects);
});


function displayprojects(projects) {
    //alert("hallo");
    const htmlString = projects
        .map((project) => {
            return `
            <div class="card" style="background-image: url('${project.image}');background-position: center">
                <div class="card-body">
                    <h2 class="card-title">${project.name}</h2>
                    <p>${project.discription}</p>
                    <a href="${project.link}" class="button">Meer info</a>
                </div>
            </div>
        `;
        })
        .join('');
    projectsList.innerHTML = htmlString;
};

loadprojects();

