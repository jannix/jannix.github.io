let currentTeddy = null;
window.onload = function () {
    BasketManager.getInstance();

    let url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (let i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }

    fetch("http://localhost:3000/api/teddies/"+data.id).then(res => {
        return res.json();
    }).then(teddy => {
        currentTeddy = teddy;
        initTeddyDetails(teddy);
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
