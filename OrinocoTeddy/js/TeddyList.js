function getTeddyList() {
    fetch("http://localhost:3000/api/teddies").then(res => {
        return res.json();
    }).then(teddies => {
        initTeddyList(teddies);
    });
}

function initTeddyList(teddies) {
    let sectionList = document.getElementById('teddy-list');
    for (let teddy of teddies)
    {
        const colDiv = buildTeddyCard(teddy);
        sectionList.appendChild(colDiv);
    }
}

function buildTeddyCard(teddy) {
    const colDiv = document.createElement('div');
    colDiv.setAttribute('class', 'col-12 col-md-6 col-lg-3 my-3');
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card h-100');
    cardDiv.setAttribute('itemprop', 'itemListElement');
    cardDiv.setAttribute('itemscope', '');
    cardDiv.setAttribute('itemtype', 'http://schema.org/Product');
    cardDiv.addEventListener('click', function() {
        const url = './html/product.html?id=' + teddy['_id'];
        document.location.href = url;
    });
    const contentCard = "<img alt=\"Photo of product\" itemprop=\"image\" class=\"card-img-top\" src=\"" + teddy['imageUrl'] + "\">\n" +
        "                <div itemprop=\"url\" class=\"card-body\" href=\"html/product\">\n" +
        "                    <h5 class=\"card-title\" itemprop=\"name\">" + teddy['name'] + "</h5>\n" +
        "                    <h6 class=\"card-subtitle\" itemprop=\"price\">" + teddy['price'] / 100 + "€</h6>\n" +
        "                    <p class=\"card-text\" itemprop=\"description\">" + teddy['description'] + "</p>\n" +
        "                </div>";
    cardDiv.innerHTML = contentCard;
    colDiv.appendChild(cardDiv);
    return colDiv;
}

window.onload = function() {
    BasketManager.getInstance();
    getTeddyList();
}

