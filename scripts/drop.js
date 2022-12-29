// Реализация функции DragNDrop
function dragNdrop() {
    const tasksListElement = document.querySelector('.list');
const taskElements = tasksListElement.querySelectorAll('.list__item');

for (const task of taskElements) {
  task.draggable = true;
}

// Слушатель события когда начинаем перетаскивание элемента
tasksListElement.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`);
});

// Слушатель события когда отпускаем элемент
tasksListElement.addEventListener(`dragend`, (evt) => {
  evt.target.classList.remove(`selected`);
});

const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
  
  const nextElement = (cursorPosition < currentElementCenter) ?
    currentElement :
    currentElement.nextElementSibling;
  
  return nextElement;
};

// Слушатель события когда уводим элемент с его начального положения
tasksListElement.addEventListener(`dragover`, (evt) => {
  evt.preventDefault();
  
  const activeElement = tasksListElement.querySelector(`.selected`);
  const currentElement = evt.target;
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains('list__item');
    
  if (!isMoveable) {
    return;
  }
  
  const nextElement = getNextElement(evt.clientY, currentElement);
  
  if (
    nextElement && 
    activeElement === nextElement.previousElementSibling ||
    activeElement === nextElement
  ) {
    return;
  }
		
	tasksListElement.insertBefore(activeElement, nextElement);
});
}
dragNdrop()