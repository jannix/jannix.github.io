function sendOrder() {
    //todo check all field
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
            console.log('Success:', data);
            sessionStorage.setItem('ORDER_DATA', JSON.stringify(data));
            document.location.href = './confirmation.html';
        })
        .catch((error) => {
            console.error('Error:', error);
            sessionStorage.setItem('ORDER_DATA', null);
            document.location.href = './confirmation.html';
        });
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
