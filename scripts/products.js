const productsList = document.getElementById('cardList');
const searchBar = document.getElementById('searchBar');
const sortx = document.getElementById('sort');
const category = document.getElementById('category');
let hpproducts = [];
var categorisedproducts=[].concat(hpproducts);

const loadproducts = async () => {
    try {
        const res = await fetch('data/products.json');
        hpproducts = await res.json();
        displayproducts(hpproducts);
    } catch (err) {
        console.error(err);
    }
};

sortx.addEventListener('change', (e) => {
    var valueSelected = sortx.value;
    var items = [].concat(categorisedproducts);//[].concat(hpproducts); // copy array not a pointer
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
    if (valueSelected == 'priceup') {
        items.sort((a, b) => {
            var aprice = parseFloat((a.price.substring(1)).replace(",", "."));
            var bprice = parseFloat((b.price.substring(1)).replace(",", "."));
            if (isNaN(aprice)) {
                aprice = 1000000*1.0;
            }
            if (isNaN(bprice)) {
                bprice = 1000000*1.0;
            }
            return aprice-bprice;
        });
    }
    if (valueSelected == 'pricedown') {
        items.sort((a, b) => {
            var aprice = parseFloat((a.price.substring(1)).replace(",", "."));
            var bprice = parseFloat((b.price.substring(1)).replace(",", "."));
            if (isNaN(aprice)) {
                aprice = 1000000*1.0;
            }
            if (isNaN(bprice)) {
                bprice = 1000000*1.0;
            }
            return bprice - aprice;
        });
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
    displayproducts(items);
}); //end of the sort by types

category.addEventListener('change', (e) => {
    var valueSelected = category.value;
    var items = [].concat(hpproducts); 
    categorisedproducts=[];
    var check = "";
    if (valueSelected == 'cities') { 
        check = "gravering";
    }
    if (valueSelected == 'plans') {
        check = "blauwdruk";
    }
    if (valueSelected == '3D') {
        check = "product";
    }
    if (check !== "") {
        
        items.filter(function(a){
            if (a.type==check){
                categorisedproducts.push(a);
            }
        });
    }
    if (valueSelected=="all"){
        categorisedproducts=[].concat(hpproducts);
    }
    displayproducts(categorisedproducts);
}); //end category

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredproducts = hpproducts.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchString) ||
            product.discription.toLowerCase().includes(searchString) ||
            product.tag.toLowerCase().includes(searchString)
        );
    });
    displayproducts(filteredproducts);
});

function displayproducts(products) {
    const htmlString = products
        .map((product) => {
            return `
            <div class="card" style="background-image: url('${product.image}')">
                <div class="card-body">
                    <h2 class="card-title">${product.name}</h2>
                    <p>${product.discription}</p>
                    <button onclick="document.getElementById('myModal${product.id}').style.display='inline'" class="button">Meer info</button>
                    <form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post">
                        <input type="hidden" name="cmd" value="_s-xclick">
                        <input type="hidden" name="hosted_button_id" value="${product.paypal}">
                        <input type="submit" value="${product.price}" name="Verzenden" alt="PayPal – The safer, easier way to pay online!">
                    </form>
                </div>
            </div>

            <div id="myModal${product.id}" class="modal">
            <div class="more-info_card">
                    <span class="close" onclick="document.getElementById('myModal${product.id}').style.display='none'">X</span>
                    <img src="${product.image1}" id="more-info_img1" alt="${product.name}" title="${product.name}" onclick="document.getElementById('myModal2${product.id}').style.display='inline'"> 
                    <img src="${product.image2}" id="more-info_img2" alt="${product.name}" title="${product.name}" onclick="document.getElementById('myModal2${product.id}').style.display='inline'"> 
                    <img src="${product.image3}" id="more-info_img3" alt="${product.name}" title="${product.name}" onclick="document.getElementById('myModal2${product.id}').style.display='inline'"> 
                <div class="more-info_description">
                    <h1>${product.name}</h1>
                    <p>${product.long_discription}</p>
                    <form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post">
                    <input type="hidden" name="cmd" value="_s-xclick">
                    <input type="hidden" name="hosted_button_id" value="${product.paypal}">
                    <input type="submit" value="${product.price}" name="Verzenden" alt="PayPal – The safer, easier way to pay online!">
                </form>
                </div>
                </div>

            <div id="myModal2${product.id}" class="modal2">
            <div class="more-info_extended_img">
                <span class="close2" onclick="document.getElementById('myModal2${product.id}').style.display='none'">X</span>
            </div>
            </div>

            </div>
        </div>

        `;
        })
        .join('');
    productsList.innerHTML = htmlString;
}
loadproducts();