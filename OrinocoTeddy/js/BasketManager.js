let BasketManager = (function () {
    let instance;
    let items = null;
    let bubbleElem = null;

    function createInstance() {
        console.log('create Instance');
        var object = new Object();
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
    }

    function removeItem(item) {
        const index = items.indexOf(item);
        if (index > -1) {
            items.splice(index, 1);
        }
        localStorage.setItem('BASKET', JSON.stringify(this.items));
        bubbleElem.innerHTML = items.length;
        if (items.length <= 0) {
            bubbleElem.classList.add('d-none');
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

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            } else {
                console.log('already instance');
            }
            return instance;
        },
        addItem: addItem,
        removeItem: removeItem,
        emptyBasket: emptyBasket,
        getItems: getItems,
    };
})();
