window.onload = function () {
    BasketManager.getInstance();

    const responseOrder = JSON.parse(sessionStorage.getItem('ORDER_DATA'));
    if (responseOrder) {
        initSuccessOrder(responseOrder);
        displayOrderList(responseOrder.products);
        BasketManager.emptyBasket();
    } else {
        initErrorOrder();
    }
    sessionStorage.removeItem('ORDER_DATA');

};

function initSuccessOrder(order) {
    const messageElem = document.getElementById('order-message');
    const orderIdElem = document.getElementById('order-id');
    const orderPriceElem = document.getElementById('order-price');
    messageElem.innerHTML = '<h1>Commande confirmée!</h1>\n' +
        '            <p>\n' +
        '                <strong>Félicitations</strong>,<br>\n' +
        '                votre commande a bien été reçue et sera traitée dans les plus brefs délais.<br>\n' +
        '                Surveillez votre boîte mail, nous vous tiendrons au courant lorsque vos nouveaux amis tout doux vous seront envoyés.<br>\n' +
        '                Merci pour votre confiance.\n' +
        '            </p>';
    orderIdElem.innerHTML = '<p>Order : #'+ order.orderId +'</p>';
    const orderPrice = getOrderPrice(order) / 100;
    orderPriceElem.innerHTML = '<p>Total commande : <strong>'+ orderPrice +'€</strong></p>';

}

function displayOrderList(orderProducts) {
    const basketList = document.getElementById('basket-list');
    basketList.setAttribute('itemscope', '');
    basketList.setAttribute('itemtype', 'http://schema.org/ItemList');
    for (let i = 0; i < orderProducts.length; i++) {
        addItem(basketList, orderProducts[i]);
    }
}

function addItem(basketList, teddy) {
    let divItem = document.createElement('div');
    divItem.setAttribute('class', 'row product-detail basket-item');
    divItem.setAttribute('itemprop', 'itemListElement');
    divItem.setAttribute('itemscope', '');
    divItem.setAttribute('itemtype', 'http://schema.org/Product');
    divItem.appendChild(createFigure(teddy));
    divItem.appendChild(createItemDetails(teddy, 1, false));
    divItem.appendChild(createItemPrices(teddy, 1));

    basketList.appendChild(divItem);
}

function initErrorOrder() {
    const messageElem = document.getElementById('order-message');
    messageElem.innerHTML = '<h1>Commande erronée!</h1>\n' +
        '            <p>\n' +
        '                <strong>Nous sommes sincèrement désolé</strong>,<br>\n' +
        '                votre commande n\'a pu être traitée correctement.<br>\n' +
        '                Veuillez vérifier votre connexion et retourner sur votre panier.<br>\n' +
        '                Si le problême persiste, n\'hesitez pas à nous contacter.\n' +
        '            </p>';
    document.getElementById("order-info").remove();
}

function getOrderPrice(order) {
    let total = 0;
    for (let i = 0; i < order.products.length; i++) {
        total += order.products[i].price;
    }
    return total;
}
