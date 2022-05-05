const projectsList = document.getElementById('projectsList');
const moreinfo = document.getElementById('more-info_card');
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
    var items = [].concat(hpprojects); // copy array not a pointer
    if (valueSelected == 'name') {
        items.sort((a, b) => {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
    }
    if (valueSelected == 'category') { 
        items.sort((a, b) => {
            var fa = a.type.toLowerCase();
            var fb = b.type.toLowerCase();
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
    }
    if (valueSelected == 'dateup') {
        items.sort((a, b) => {
            var fa = a.date.toLowerCase();
            var fb = b.date.toLowerCase();
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
    }
    if (valueSelected == 'datedown') {
        items.sort((a, b) => {
            var fa = a.date.toLowerCase();
            var fb = b.date.toLowerCase();
            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        })
    }
    displayprojects(items);
}); //end of the sort by types

category.addEventListener('change', (e) => {
    var valueSelected = category.value;
    var items = [].concat(hpprojects); 
    var categorisedprojects=[];
    var check = "";
    if (valueSelected == 'Construction') { 
        check = "bouw";
    }
    if (valueSelected == 'Design') {
        check = "ontwerp";
    }
    if (valueSelected == 'Engineering') {
        check = "engineering";
    }
    if (valueSelected == 'School') {
        check = "school";
    }
    if (valueSelected == 'Other') {
        check = "overig";
    }
    if (check !== "") {
        
        items.filter(function(a){
            if (a.type==check){
                categorisedprojects.push(a);
            }
        });
    }
    if (valueSelected=="all"){
        categorisedprojects=hpprojects;
    }
    displayprojects(categorisedprojects);
}); //end category

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
    const htmlString = projects
        .map((project) => {
            return `
            <div class="card" style="background-image: url('${project.image}')">
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

/*
function displayprojects(projects) {
    const htmlString = projects
        .map((project) => {
            return `
            <div class="more-info_card">
            <div class="more-info_image1">
                <img src="${project.image1}" alt="${project.name}" title="${project.name}"> 
            </div>
            <div class="more-info_image2">
                <img src="${project.image2}" alt="${project.name}" title="${project.name}"> 
            </div>
            <div class="more-info_image3">
                <img src="${project.image3}" alt="${project.name}" title="${project.name}"> 
            </div>
            <div class="more-info_description">
                <p>${project.long_discription}</p>
            </div>
            <div class="more-info_video">
                <p>${project.video}</p>
            </div>
            <div class="more-info_pdf">
                <p>${project.pdf}</p>
            </div>
        </div>
        `;
    })
    .join('');
    moreinfo.innerHTML = htmlString;
};
*/


loadprojects();