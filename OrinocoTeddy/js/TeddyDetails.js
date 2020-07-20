let currentTeddy = null;
const MAX_OTHER_TEDDY = 5;
window.onload = function () {
    BasketManager.getInstance();

    let url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (let i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }

    fetch(API_TEDDIES+data.id).then(res => {
        return res.json();
    }).then(teddy => {
        currentTeddy = teddy;
        initTeddyDetails(teddy);
    });

    fetch(API_TEDDIES).then(res => {
        return res.json();
    }).then(teddies => {
        initTeddyList(teddies);
    });
};

function initTeddyDetails(teddy) {
    let teddyFigure = document.getElementById('teddyFig');
    const contentFig = "<img src=\"" + teddy['imageUrl'] + "\" alt=\"Teddy Image\" itemprop=\"image\">";
    teddyFigure.innerHTML = contentFig;
    buildTeddyDetails(teddy);
    buildColorSelect(teddy['colors']);

    let teddyOrder = document.getElementById('teddyOrder');
    const contentAddToBasket = "<p>Pensez à choisir votre couleur préférée avant d'ajouter votre teddy au panier</p>\n" +
        "            <span itemprop=\"price\"><strong>" + teddy['price'] / 100 + "€</br></strong></span>\n" +
        "            <button id=\"buttonAdd\" type=\"button\" class=\"btn btn-success\">Ajouter au panier</button>";
    teddyOrder.innerHTML = contentAddToBasket;

    document.getElementById('buttonAdd').addEventListener("click", function () {
        BasketManager.getInstance();
        const teddyToAdd = {
            _id: currentTeddy._id,
            name: currentTeddy.name,
            price: currentTeddy.price,
            imageUrl: currentTeddy.imageUrl,
            description: currentTeddy.description,
            color: document.getElementById("selectColor").value,
        };
        BasketManager.addItem(teddyToAdd);
    });
}



function buildTeddyDetails(teddy) {
    let teddyDetails = document.getElementById('teddyDetails');
    teddyDetails.innerHTML = "<h2>"+teddy['name']+"</h2>\n" +
        "            <span itemprop=\"price\">"+teddy['price'] / 100+"€</span>\n" +
        "            <p itemprop=\"description\">"+teddy['description']+"</p>";
}

function buildColorSelect(colors) {
    let teddyDetails = document.getElementById('teddyDetails');

    const selectLabel = document.createElement('label');
    selectLabel.setAttribute('for', 'selectColor');
    selectLabel.innerHTML = 'Couleur : ';
    teddyDetails.appendChild(selectLabel);

    const selectList = document.createElement("select");
    selectList.id = "selectColor";
    teddyDetails.appendChild(selectList);

    for (let i = 0; i < colors.length; i++) {
        const option = document.createElement("option");
        option.value = colors[i];
        option.text = colors[i];
        selectList.appendChild(option);
    }
}
function initTeddyList(teddies) {
    let sectionList = document.getElementById('otherTeddies');
    let i = 0;
    for (let teddy of teddies)
    {
        if (i >= MAX_OTHER_TEDDY) {
            break;
        }
        const colDiv = buildTeddyCard(teddy);
        sectionList.appendChild(colDiv);
        i++;
    }
}

function buildTeddyCard(teddy) {
    const colDiv = document.createElement('div');
    colDiv.setAttribute('class', 'col-6 col-md-1 col-lg-2 my-3');
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card h-100');
    cardDiv.setAttribute('itemprop', 'itemListElement');
    cardDiv.setAttribute('itemscope', '');
    cardDiv.setAttribute('itemtype', 'http://schema.org/Product');
    cardDiv.addEventListener('click', function() {
        const url = './product.html?id=' + teddy['_id'];
        document.location.href = url;
    });
    const contentCard = "<img alt=\"Photo of product\" itemprop=\"image\" class=\"card-img-top\" src=\"" + teddy['imageUrl'] + "\">\n" +
        "                <div itemprop=\"url\" class=\"card-body\" href=\"html/product\">\n" +
        "                    <h5 class=\"card-title\" itemprop=\"name\">" + teddy['name'] + "</h5>\n" +
        "                    <h6 class=\"card-subtitle\" itemprop=\"price\">" + teddy['price'] / 100 + "€</h6>\n" +
        "                </div>";
    cardDiv.innerHTML = contentCard;
    colDiv.appendChild(cardDiv);
    return colDiv;
}


