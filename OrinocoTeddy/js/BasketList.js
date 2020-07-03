window.onload = function () {
    BasketManager.getInstance();

    initBasketLit();

};

function initBasketLit() {
    const basketItems = BasketManager.getSortedItems();
    const basketList = document.getElementById('basket-list');
    let listContent = '<h1>Votre panier :</h1>';
    if (basketItems.length === 0) {
        return;
    }
    for (let i = 0; i < basketItems.length; i++) {
        let itemTeddy = '<div class="row product-detail">\n' +
            '                <figure id="teddyFig-' + basketItems[i].teddy._id + basketItems[i].teddy.color + '" ' +
            '                   class="col-6 col-md-2 col-lg-3 px-4">\n' +
            '                    <img src="' + basketItems[i].teddy.imageUrl + '" alt="Teddy image">\n' +
            '                </figure>\n' +
            '                <div class="col-7">\n' +
            '                    <h2>' + basketItems[i].teddy.name + '</h2>\n' +
            '                    <p>Couleur : '+ basketItems[i].teddy.color +'</p>\n' +
            '                    <label for="qty">Quantité :</label>\n' +
            '                    <select name="qty" id="qty" onchange="selectQty(this)">\n' +
            '                        <option value="1">1</option>\n' +
            '                        <option value="2">2</option>\n' +
            '                        <option value="3">3</option>\n' +
            '                        <option value="4">4</option>\n' +
            '                    </select>\n' +
            '                    <button class="btn-warning">Delete</button>\n' +
            '\n' +
            '                </div>\n' +
            '                <div class="col-2">\n' +
            '                    <p>' + basketItems[i].qty + ' x '+(basketItems[i].teddy.price / 100)+'€ : ' +
            '                       <strong>' + basketItems[i].qty * (basketItems[i].teddy.price / 100) + '€</strong></p>\n' +
            '                </div>\n' +
            '            </div>';
        listContent += itemTeddy;
    }
    let totalElem = '<div class="row product-total">\n' +
        '                <div class="col-9">\n' +
        '                    <h2>Total</h2>\n' +
        '                </div>\n' +
        '                <div class="col-3">\n' +
        '                    <p><strong>' + (BasketManager.getTotalPrice() / 100) + '€</strong></p>\n' +
        '                </div>\n' +
        '            </div>';
    listContent += totalElem;
    basketList.innerHTML = listContent;

}

function selectQty(selecter) {
    console.log(selecter.value);
}
