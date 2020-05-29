console.log('test');

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
    var innerSection = '';
    for (let teddy of teddies)
    {
        var divCard = "<div class=\"col-12 col-md-6 col-lg-3 my-1\">\n" +
            "            <div class=\"card\">\n" +
            "                <img class=\"card-img-top\" src=\""+teddy['imageUrl']+"\" alt=\"Card image cap\">\n" +
            "                <div class=\"card-body\">\n" +
            "                    <h5 class=\"card-title\">"+teddy['name']+"</h5>\n" +
            "                    <p class=\"card-text\">"+teddy['description']+"</p>\n" +
            "                    <a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "        </div>";
        innerSection += divCard;
    }

    sectionList.innerHTML = innerSection;
}

function buildTeddyCard(teddy) {
    console.log(teddy);
}


getTeddyList();
