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
        basketList.innerHTML += '<div class="row justify-content-center">\n' +
            '                <p class="col-12 col-md-8">\n' +
            '                    <strong>Est vide</strong> mais vous pouvez encore trouver le teddy de vos rêves. <br>\n' +
            '                    Rendez-vous sur <a href="../index.html">la liste de nos produits</a> et faites votre choix.\n' +
            '                </p>\n' +
            '            </div>';
        return;
    }
    for (let i = 0; i < basketItems.length; i++) {
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
    divItem.appendChild(createFigure(item.teddy));
    divItem.appendChild(createItemDetails(item.teddy, item.qty, true));
    divItem.appendChild(createItemPrices(item.teddy, item.qty));

    basketList.addEventListener('remove-'+ item.teddy._id + item.teddy.color, function () {
        basketList.removeChild(divItem);
        if (BasketManager.getItems().length === 0) {
            initBasketLit();
        }
    });

    basketList.appendChild(divItem);
}

function createItemDetails(teddy, qty, canRemove) {
    let divDetails = document.createElement('div');
    divDetails.setAttribute('class', 'col-12 col-md-6 basket-item-details');
    if (canRemove) {
        divDetails.innerHTML = '<h2 itemprop="name">' + teddy.name + '</h2>\n' +
            '                   <p>Couleur : '+ teddy.color +'</p>\n' +
            '                   <label for="qty">Quantité : ' + qty + '</label>';
        const removeEvent = new CustomEvent('remove-'+ teddy._id + teddy.color, {
            bubbles: true,
        });
        divDetails.appendChild(createDeleteBtn(teddy, removeEvent));
    } else {
        divDetails.innerHTML = '<h2 itemprop="name">' + teddy.name + '</h2>\n' +
            '                   <label for="qty">Quantité : ' + qty + '</label>';
    }


    return divDetails;
}

function createItemPrices(teddy, qty) {
    let divPrices = document.createElement('div');
    divPrices.setAttribute('class','col-12 col-md-2 basket-item-price');
    divPrices.innerHTML = '<p>' + qty + ' x '+(teddy.price / 100)+'€ : ' +
        '                  <strong itemprop="price">' + qty * (teddy.price / 100) + '€</strong></p>';

    return divPrices;
}

function createFigure(teddy) {
    let figureItem = document.createElement('figure');
    figureItem.setAttribute('id', 'teddyFig-' + teddy._id + teddy.color);
    figureItem.setAttribute('class', 'col-12 col-md-2 col-lg-3 px-4');
    figureItem.innerHTML = '<img src="' + teddy.imageUrl + '" alt="Teddy image" itemprop=\"image\">';

    return figureItem;

}

function createDeleteBtn(teddy, removeEvent) {
    let btn = document.createElement('button');
    btn.innerHTML = 'Delete';
    btn.setAttribute('class', 'btn-warning');

    btn.addEventListener("click", function () {
        BasketManager.removeGroupItems(teddy._id, teddy.color);
        disableOrder();
        updateTotalPrice();
        btn.dispatchEvent(removeEvent);
    });
    return btn;
}
