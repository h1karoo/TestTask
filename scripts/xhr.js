async function getResponse() {
    let response = await fetch('https://dummyjson.com/products');
    let content = await response.json();
    var getNum = document.getElementById('get_num').value;
    content = content.products.splice(0, getNum)

    let list = document.querySelector('.list')
    list.innerHTML = ''
    let key;
    for (key in content) {
        list.innerHTML += `
        <li class='list__item' draggable = "true" id = "ufo">
        <p class = 'list__item_title'>${content[key].title}</p>
        <p class = 'list__item_category'>Category:${content[key].category}</p>
        <p class = 'list__item_price'>Price:${content[key].price}$</p>
        </li>
        <li class='list__subitem'>
        <p class = 'list__subitem_title'>${content[key].title}</p>
        <p class = 'list__subitem_category'>Category: ${content[key].category}</p>
        <p class = 'list__subitem_desc'>${content[key].description}</p>
        <img class = 'list__subitem_thumbnail' src = "${content[key].thumbnail}">
        <p class = 'list__subitem_price'>Price:${content[key].price}$</p>
        </li>
        `
        var links = document.getElementsByClassName('list__item');

for (let i = 0; i < links.length; i++) {
    links[i].onmouseover = function() {
        var tooltip = document.getElementsByClassName('list__subitem');
        var too = tooltip[i];
        too.style.display = "block";
    }
    links[i].onmouseout = function() {
        var tooltip = document.getElementsByClassName('list__subitem');
        var too = tooltip[i];
        too.style.display = "none";
    }
}
    }
}
getResponse()