const toolsList = document.getElementById('cardList');
const searchBar = document.getElementById('searchBar');
const sortx = document.getElementById('sort');
const category = document.getElementById('category');
let hptools = [];
var categorisedtools=[].concat(hptools);

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
    var items = [].concat(categorisedtools); // copy array not a pointer
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
    categorisedtools=[];
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
        categorisedtools=[].concat(hptools);
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
                    <button onclick="document.getElementById('myModal${tool.id}').style.display='inline'" class="button">Meer info</button>
                </div>
            </div>

            <div id="myModal${tool.id}" class="modal">
            <div class="more-info_card">
                    <span class="close" onclick="document.getElementById('myModal${tool.id}').style.display='none'">X</span>
                    <img src="${tool.image1}" id="more-info_img1" alt="${tool.name}" title="${tool.name}"> 
                    <img src="${tool.image2}" id="more-info_img2" alt="${tool.name}" title="${tool.name}"> 
                    <img src="${tool.image3}" id="more-info_img3" alt="${tool.name}" title="${tool.name}"> 
                <div class="more-info_description">
                    <h1>${tool.name}</h1>
                    <p>${tool.long_discription}</p>
                </div>
                <div class="more-info_iframe">
                <iframe src="${tool.iframe}" class="info-iframe"> </iframe>
                </div>
            </div>
        </div>

        `;
        })
        .join('');
    toolsList.innerHTML = htmlString;
};

loadtools();

