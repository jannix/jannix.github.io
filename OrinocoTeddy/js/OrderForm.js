const validatorsRules = {
    namePattern: '[a-zA-Z ,.\'-]{2,}$',
    addressPattern: '[a-zA-Z0-9~#^*()[\\]{}|\\\\,.: -]{3,}$',
    zipPattern: '[a-zA-Z0-9 -]{2,}$',
    emailPattern: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+$',
};

function sendOrder() {
    if (!canOrder()) {
        return;
    }
    document.getElementById('spinner').classList.remove('d-none');
    const contact = {
        firstName: getInputValue('surname'),
        lastName: getInputValue('name'),
        address: getInputValue('inputAddress') + ' '
        + getInputValue('inputAddress2') + ' '
        + getInputValue('inputZip'),
        city: getInputValue('inputCity'),
        email: getInputValue('email'),
    };
    const products = getOrderIds();
    const request = {
      contact: contact,
      products: products,
    };
    fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    }).then(response => response.json())
        .then(data => {
            sessionStorage.setItem('ORDER_DATA', JSON.stringify(data));
            document.location.href = './confirmation.html';
        })
        .catch((error) => {
            console.error('Error:', error);
            sessionStorage.setItem('ORDER_DATA', null);
            document.location.href = './confirmation.html';
        });
}

function canOrder() {
    if (BasketManager.getItems().length === 0) {
        return false;
    }
    return matchPattern(getInputValue('name'), validatorsRules.namePattern) &&
        matchPattern(getInputValue('surname'), validatorsRules.namePattern) &&
        matchPattern(getInputValue('inputAddress'), validatorsRules.addressPattern) &&
        matchPattern(getInputValue('inputZip'), validatorsRules.zipPattern) &&
        matchPattern(getInputValue('inputCity'), validatorsRules.namePattern) &&
        matchPattern(getInputValue('email'), validatorsRules.emailPattern);
}

function getInputValue(inputID) {
    const inputElem = document.getElementById(inputID);
    return inputElem.value;
}

function getOrderIds() {
    const items = BasketManager.getItems();
    const orderIds = [];
    for (let item of items) {
        orderIds.push(item._id);
    }
    return orderIds;
}

function checkField($event) {
    const srcElem = $event.srcElement;
    let isValidated = false;
    if (srcElem.id === 'name' || srcElem.id === 'surname' || srcElem.id === 'inputCity') {
        isValidated = matchPattern(srcElem.value, validatorsRules.namePattern);
    } else if (srcElem.id === 'inputZip') {
        isValidated = matchPattern(srcElem.value, validatorsRules.zipPattern);
    } else if (srcElem.id === 'email') {
        isValidated = matchPattern(srcElem.value, validatorsRules.emailPattern);
    } else if (srcElem.id === 'inputAddress') {
        isValidated = matchPattern(srcElem.value, validatorsRules.addressPattern);
    }
    if (isValidated) {
        srcElem.classList.add('is-valid');
        srcElem.classList.remove('is-invalid');
    } else {
        srcElem.classList.add('is-invalid');
        srcElem.classList.remove('is-valid');
    }

    return isValidated;
}

function matchPattern(value, pattern) {
    const regex = new RegExp(pattern);
    return regex.test(value);
}

