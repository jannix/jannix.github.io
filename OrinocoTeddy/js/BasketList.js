window.onload = function () {
    BasketManager.getInstance();

    initBasketLit();

    disableOrder();
    updateTotalPrice();

};

function disableOrder() {
    if (BasketManager.getItems().length <= 0) {
        document.getElementById('orderBtn').setAttribute('disabled', '');
    }
}

function updateTotalPrice() {
    const elemTotal = document.getElementById('total-price');
    if (elemTotal && BasketManager.getItems().length === 0) {
        document.getElementById('total-price').setAttribute('class', 'd-none');
    } else if (elemTotal) {
        document.getElementById('total-price').innerHTML = '<div class="col-10">\n' +
            '                    <h2>Total</h2>\n' +
            '                </div>\n' +
            '                <div class="col-2">\n' +
            '                    <p><strong>' + (BasketManager.getTotalPrice() / 100) + '€</strong></p>\n' +
            '                </div>';
    }

}

function initBasketLit() {
    const basketItems = BasketManager.getSortedItems();
    const basketList = document.getElementById('basket-list');
    basketList.setAttribute('itemscope', '');
    basketList.setAttribute('itemtype', 'http://schema.org/ItemList');
    basketList.innerHTML = '<h1 id="basket-title">Votre Panier :</h1>';
    if (basketItems.length === 0) {
        return;
    }
    for (let i = 0; i < basketItems.length; i++) {
        /*'                    <select name="qty" id="qty" onchange="selectQty(this)">\n' +
            '                        <option value="1">1</option>\n' +
            '                        <option value="2">2</option>\n' +
            '                        <option value="3">3</option>\n' +
            '                        <option value="4">4</option>\n' +
            '                    </select>\n' +
            '                    <button class="btn-warning">Delete</button>\n' +
            '\n' +*/
        addItem(basketList, basketItems[i]);
    }
    let divTotalPrice = document.createElement('div');
    divTotalPrice.setAttribute('id', 'total-price');
    divTotalPrice.setAttribute('class', 'row product-total');
    divTotalPrice.innerHTML = '<div class="col-10">\n' +
        '                    <h2>Total</h2>\n' +
        '                </div>\n' +
        '                <div class="col-2">\n' +
        '                    <p><strong>' + (BasketManager.getTotalPrice() / 100) + '€</strong></p>\n' +
        '                </div>';
    basketList.appendChild(divTotalPrice);
}

function addItem(basketList, item) {
    let divItem = document.createElement('div');
    divItem.setAttribute('class', 'row product-detail basket-item');
    divItem.setAttribute('itemprop', 'itemListElement');
    divItem.setAttribute('itemscope', '');
    divItem.setAttribute('itemtype', 'http://schema.org/Product');
    divItem.appendChild(createFigure(item));
    divItem.appendChild(createItemDetails(item));
    divItem.appendChild(createItemPrices(item));

    basketList.addEventListener('remove-'+ item.teddy._id + item.teddy.color, function () {
        basketList.removeChild(divItem);
    });

    basketList.appendChild(divItem);
}

function createItemDetails(item) {
    let divDetails = document.createElement('div');
    divDetails.setAttribute('class', 'col-6 basket-item-details');
    divDetails.innerHTML = '<h2 itemprop="name">' + item.teddy.name + '</h2>\n' +
        '                   <p>Couleur : '+ item.teddy.color +'</p>\n' +
        '                   <label for="qty">Quantité : ' + item.qty + '</label>';
    const removeEvent = new CustomEvent('remove-'+ item.teddy._id + item.teddy.color, {
        bubbles: true,
    });

    divDetails.appendChild(createDeleteBtn(item, removeEvent));

    return divDetails;
}

function createItemPrices(item) {
    let divPrices = document.createElement('div');
    divPrices.setAttribute('class','col-2 basket-item-price');
    divPrices.innerHTML = '<p>' + item.qty + ' x '+(item.teddy.price / 100)+'€ : ' +
        '                  <strong itemprop="price">' + item.qty * (item.teddy.price / 100) + '€</strong></p>';

    return divPrices;
}

function createFigure(item) {
    let figureItem = document.createElement('figure');
    figureItem.setAttribute('id', 'teddyFig-' + item.teddy._id + item.teddy.color);
    figureItem.setAttribute('class', 'col-6 col-md-2 col-lg-3 px-4');
    figureItem.innerHTML = '<img src="' + item.teddy.imageUrl + '" alt="Teddy image" itemprop=\"image\">';

    return figureItem;

}

function createDeleteBtn(item, removeEvent) {
    let btn = document.createElement('button');
    btn.innerHTML = 'Delete';// '<button class="btn-warning">Delete</button>';
    btn.setAttribute('class', 'btn-warning');

    btn.addEventListener("click", function () {
        BasketManager.removeGroupItems(item.teddy._id, item.teddy.color);
        disableOrder();
        updateTotalPrice();
        btn.dispatchEvent(removeEvent);
    });
    return btn;
}

function selectQty(selecter) {
    console.log(selecter.value);
}
