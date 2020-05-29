

function getTeddyList() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var response = JSON.parse(this.responseText);
            initTeddyList(response);
        }
    };
    request.open("GET", "http://localhost:3000/api/teddies/");
    request.send();
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
    var colDiv = document.createElement('div');
    colDiv.setAttribute('class', 'col-12 col-md-6 col-lg-3 my-3');
    var cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card h-100');
    cardDiv.addEventListener('click', function() {
        console.log('click and go to product', teddy['_id']);
        var url = './html/product.html?id=' + teddy['_id']

        document.location.href = url;
    });
    var contentCard = "<img class=\"card-img-top\" src=\""+teddy['imageUrl']+"\" alt=\"Card image cap\">\n" +
        "                <div class=\"card-body\" href=\"html/product\">\n" +
        "                    <h5 class=\"card-title\">"+teddy['name']+"</h5>\n" +
        "                    <h6 class=\"card-subtitle\">"+teddy['price'] / 100 +"</h6>\n" +
        "                    <p class=\"card-text\">"+teddy['description']+"</p>\n" +
        "                </div>";
    cardDiv.innerHTML = contentCard;
    colDiv.appendChild(cardDiv);
    return colDiv;
}


getTeddyList();
