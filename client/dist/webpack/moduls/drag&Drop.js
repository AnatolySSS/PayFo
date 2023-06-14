//Включает перетаскивание параграфов решения
export function dragAndDrop() {
  const tasksListElement = document.querySelector(`#decision`);
  const taskElements = tasksListElement.querySelectorAll(`p`);

  //Присваиваем всем абзацам решения тип draggable
  for (const task of taskElements) {
    task.draggable = true;
    task.classList.add(`draggable_element`);
  }

  //Добавляем класс selected к выбранному элементу (определен в style.css)
  tasksListElement.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
  });

  //Удаляем класс selected после окончания перетаскивания
  tasksListElement.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
  });
  //Мы добрались до основной части — перетаскивания задач. Будем отслеживать местоположение перемещаемого элемента относительно других, подписавшись на событие dragover. Оно срабатывает каждые несколько сотен миллисекунд, пока перетаскиваемый элемент находится над зоной, в которую может быть сброшен. В данном случае это tasksListElement, на нём и будем отслеживать dragover.
  tasksListElement.addEventListener(`dragover`, (evt) => {
    //По умолчанию большинство областей на странице недоступны для сброса. 
    //Чтобы создать область, в которую элементы могут быть сброшены, нужно внутри обработчика события dragover отменить действие 
    //по умолчанию, переопределив поведение. Сделаем такой областью весь список задач.
    evt.preventDefault();
    //Найдём выбранный элемент (с классом selected) и тот элемент, на котором сработало событие dragover.
    const activeElement = tasksListElement.querySelector(`.selected`);
    const currentElement = evt.target;
    //Проверим, что событие dragover сработало не на выбранном элементе, потому что иначе перемещать элемент нет смысла — он уже на нужном месте.
    //Также проверим, что dragover сработало именно на одном из элементов списка. Это важно, потому что курсор может оказаться и на пустом пространстве между элементами, а оно нас не интересует.
    const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(`draggable_element`);
    //Если условие не выполняется, прервём выполнение функции, отменив все дальнейшие действия
    if (!isMoveable) {
      return;
    }
    //Теперь найдём элемент, перед которым нужно осуществить вставку. Сделаем это, сравнив положение выбранного элемента и текущего, на который наведён курсор.
    const nextElement = (currentElement === activeElement.nextElementSibling) ?
		currentElement.nextElementSibling :
		currentElement;
    //Осталось только вставить элемент на новое место. Для этого воспользуемся методом insertBefore.
    //Он вызывается на родительском элементе, первым параметром принимает вставляемый элемент, а вторым — элемент, 
    //перед которым нужно вставить.
  	tasksListElement.insertBefore(activeElement, nextElement);
  
  });
  

}

