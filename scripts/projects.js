const projectsList = document.getElementById('cardList');
const searchBar = document.getElementById('searchBar');
const sortx = document.getElementById('sort');
const category = document.getElementById('category');
let hpprojects = [];
var categorisedprojects=[].concat(hpprojects);

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
    var items = [].concat(categorisedprojects);//[].concat(hpprojects); // copy array not a pointer
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
        });
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
        });
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
        });
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
        });
    }
    displayprojects(items);
}); //end of the sort by types

category.addEventListener('change', (e) => {
    var valueSelected = category.value;
    var items = [].concat(hpprojects); 
   categorisedprojects=[];
   //categorisedprojects=[].concat(hpprojects);
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
        categorisedprojects=[].concat(hpprojects);
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
                    <button onclick="document.getElementById('myModal${project.id}').style.display='inline'" class="button">Meer info</button>
                </div>
            </div>

                <div id="myModal${project.id}" class="modal">
                    <div class="more-info_card">
                            <span class="close" onclick="document.getElementById('myModal${project.id}').style.display='none'">X</span>
                            <img src="${project.image1}" id="more-info_img1" alt="${project.name}" title="${project.name}"> 
                            <img src="${project.image2}" id="more-info_img2" alt="${project.name}" title="${project.name}"> 
                            <img src="${project.image3}" id="more-info_img3" alt="${project.name}" title="${project.name}"> 
                        <div class="more-info_description">
                            <h1>${project.name}</h1>
                            <p>${project.long_discription}</p>
                            <a href="${project.link}">"${project.link}"</a>
                        </div>
                        <div class="more-info_iframe">
                        <iframe src="${project.iframe}" class="info-iframe"> </iframe>
                        </div>
                    </div>
                </div>
            
        `;
        })
        .join('');
    projectsList.innerHTML = htmlString;
}

loadprojects();