// Функция для получения списка товаров и их сортировки
async function getResponse() {
    // Fetch запрос для получения списка товаров
    let response = await fetch('https://dummyjson.com/products');
    let content = await response.json();
    var getNum = document.getElementById('get_num').value;
    content = content.products.splice(0, getNum);
    let list = document.querySelector('.list');
    list.innerHTML = '';

    let key;
    showList(content, list);
    const selectSort = document.querySelector('.select__sort')
	selectSort.addEventListener('change', evt => {
        const listItems = document.querySelectorAll('.list__item')
        const listSubItems = document.querySelectorAll('.list__subitem')
		const sortBy = evt.target.value
		//Очищение списка
        listItems.forEach(item => {
			item.remove()
		})
        // Очистка списка всплывающей панели
        listSubItems.forEach(item => {
			item.remove()
		})
		//Выбор сортировки
		if (sortBy === 'default') {
			content.sort((a, b) => (a.id > b.id ? 1 : -1))
		} else if (sortBy === 'price') {
			content.sort((a, b) => (a.price > b.price ? 1 : -1))
		} else if (sortBy === 'title') {
			content.sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
		}
		//Создание нового списка
        showList(content, list);
	})
}
// Функция для вывода списка на страницу
function showList(content, list) {
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
        // Реализация дополнительной панели с описанием каждого товара
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
    }}
getResponse()