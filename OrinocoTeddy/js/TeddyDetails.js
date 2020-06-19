var currentTeddy = null;
window.onload = function () {
    BasketManager.getInstance();
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }

    fetch("http://localhost:3000/api/teddies/"+data.id).then(res => {
        return res.json();
    }).then(teddy => {
        currentTeddy = teddy;
        initTeddyDetails(teddy);
    });
    // do the requ, callback and stuff

    //document.getElementById('here').innerHTML = data.name;
}

function initTeddyDetails(teddy) {
    let teddyArticle = document.getElementById('teddyArt');
    let teddyFigure = document.getElementById('teddyFig');
    var contentFig = "<img src=\""+teddy['imageUrl']+"\" alt=\"Teddy Image\">";
    teddyFigure.innerHTML = contentFig;
    buildTeddyDetails(teddy);
    buildColorSelect(teddy['colors']);

    let teddyOrder = document.getElementById('teddyOrder');
    var contentAddToBasket = "<p>Pensez à choisir votre couleur préférée avant d'ajouter votre teddy au panier</p>\n" +
        "            <span><strong>"+teddy['price'] / 100+"€</br></strong></span>\n" +
        "            <button id=\"buttonAdd\" type=\"button\" class=\"btn btn-success\">Ajouter au panier</button>";
    teddyOrder.innerHTML = contentAddToBasket;

    document.getElementById('buttonAdd').addEventListener("click", function () {
        BasketManager.getInstance();
        BasketManager.addItem(currentTeddy);
    });
    //build color select
    //console.log(teddy);
}



function buildTeddyDetails(teddy) {
    let teddyDetails = document.getElementById('teddyDetails');
    teddyDetails.innerHTML = "<h2>"+teddy['name']+"</h2>\n" +
        "            <span>"+teddy['price'] / 100+"€</span>\n" +
        "            <p>"+teddy['description']+"</p>";
}

function buildColorSelect(colors) {
    let teddyDetails = document.getElementById('teddyDetails');

    var selectList = document.createElement("select");
    selectList.id = "selectColor";
    teddyDetails.appendChild(selectList);

    for (var i = 0; i < colors.length; i++) {
        var option = document.createElement("option");
        option.value = colors[i];
        option.text = colors[i];
        selectList.appendChild(option);
    }
}
