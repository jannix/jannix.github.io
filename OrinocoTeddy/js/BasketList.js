window.onload = function () {
    BasketManager.getInstance();

    initBasketLit();

};

function initBasketLit() {
    const basketItems = BasketManager.getSortedItems();
    const basketList = document.getElementById('basket-list');
    let listContent = '<h1>Votre panier :</h1>';
    for (let i = 0; basketItems.length; i++) {

    }
    console.log(basketItems);
}

function selectQty(selecter) {
    console.log(selecter.value);
}
