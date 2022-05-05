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

sortx.addEventListener('change', (e) => {
    var valueSelected = sortx.value;
    var items = [].concat(hptools); // copy array not a pointer
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
    if (valueSelected == 'category') { //was categorie
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
    displaytools(items);
}); //end of the sort by types

category.addEventListener('change', (e) => {
    var valueSelected = category.value;
    var items = [].concat(hptools); 
    var categorisedtools=[];
    var check = "";
    if (valueSelected == 'heavy') { 
        check = "zware machines";
    }
    if (valueSelected == 'wood') {
        check = "hout";
    }
    if (valueSelected == 'metal') {
        check = "metaal";
    }
    if (valueSelected == 'other') {
        check = "overig";
    }
    if (check !== "") {
        
        items.filter(function(a){
            if (a.type==check){
                categorisedtools.push(a);
            }
        });
    }
    if (valueSelected=="all"){
        categorisedtools=hptools;
    }
    displaytools(categorisedtools);
}); //end category

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

function displaytools(tools) {
    const htmlString = tools
        .map((tool) => {
            return `
            <div class="card" style="background-image: url('${tool.image}')">
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

