let BasketManager = (function () {
    let instance;
    let items = null;
    let bubbleElem = null;

    function createInstance() {
        const object = new Object();
        items = JSON.parse(localStorage.getItem('BASKET'));
        if (bubbleElem === null) {
            bubbleElem = document.getElementById('bubble-basket');
        }
        if (items === null) {
            bubbleElem.classList.add('d-none');
            items = [];
            localStorage.removeItem('BASKET');
        } else if (items.length > 0) {
            bubbleElem.classList.remove('d-none');
            bubbleElem.innerHTML = items.length;
        }
        return object;
    }

    function addItem(item) {
        items.push(item);
        localStorage.setItem('BASKET', JSON.stringify(items));
        bubbleElem.innerHTML = items.length;
        if (bubbleElem.classList.contains('d-none')) {
            bubbleElem.classList.remove('d-none');
        }
        if (bubbleElem.classList.contains('bubble-add')) {
            bubbleElem.classList.remove('bubble-add');
        }
        bubbleElem.classList.add('bubble-add');
        bubbleElem.addEventListener('animationend', () => {
            if (bubbleElem.classList.contains('bubble-add')) {
                bubbleElem.classList.remove('bubble-add');
            }
        });
    }

    function removeItem(item) {
        const index = items.indexOf(item);
        if (index > -1) {
            items.splice(index, 1);
        }
        localStorage.setItem('BASKET', JSON.stringify(items));
        bubbleElem.innerHTML = items.length;
        if (items.length <= 0) {
            bubbleElem.classList.add('d-none');
        } else {
            if (bubbleElem.classList.contains('bubble-remove')) {
                bubbleElem.classList.remove('bubble-remove');
            }
            bubbleElem.classList.add('bubble-remove');
            bubbleElem.addEventListener('animationend', () => {
                if (bubbleElem.classList.contains('bubble-remove')) {
                    bubbleElem.classList.remove('bubble-remove');
                }
            });
        }
    }

    function removeGroupItems(itemId, itemColor) {
        const itemsToRemove = [];
        for (let item of items) {
            if (item._id === itemId && item.color === itemColor) {
                itemsToRemove.push(item);
            }
        }
        for (let i = itemsToRemove.length -1; i >= 0; i--) {
            removeItem(itemsToRemove[i]);
        }
    }

    function emptyBasket() {
        items.length = 0;
        localStorage.removeItem('BASKET');
        bubbleElem.classList.add('d-none');
    }

    function getItems() {
        return items;
    }
    
    function getSortedItems() {
        let sortedArray = [];
        for (let i = 0; i < items.length; i++) {
            const _id = items[i]._id;
            const color = items[i].color;
            let newItem = true;
            for (let y = 0; y < sortedArray.length; y++) {
                if (sortedArray[y].teddy._id === _id && sortedArray[y].teddy.color === color) {
                    sortedArray[y].qty++;
                    newItem = false;
                }
            }
            if (newItem === true) {
                sortedArray.push({
                    teddy: items[i],
                    qty: 1,
                });
            }
        }
        return sortedArray;
    }

    function getTotalPrice() {
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            total += items[i].price;
        }
        return total;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
        addItem: addItem,
        removeItem: removeItem,
        removeGroupItems: removeGroupItems,
        emptyBasket: emptyBasket,
        getItems: getItems,
        getSortedItems: getSortedItems,
        getTotalPrice: getTotalPrice,
    };
})();
