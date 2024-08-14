document.addEventListener('DOMContentLoaded', () => {
    const lists = document.querySelectorAll('.list');
    const cards = document.querySelectorAll('.card');

    let draggedCard = null;

    cards.forEach(card => {
        card.addEventListener('dragstart', () => {
            draggedCard = card;
            setTimeout(() => card.classList.add('dragging'), 0);
        });

        card.addEventListener('dragend', () => {
            setTimeout(() => {
                draggedCard.classList.remove('dragging');
                draggedCard = null;
            }, 0);
        });
    });

    lists.forEach(list => {
        list.addEventListener('dragover', e => {
            e.preventDefault();
            const draggingCard = document.querySelector('.card.dragging');
            
            const addCardButton = list.querySelector('.add-card');

            list.insertBefore(draggingCard, addCardButton);
        });
    });

    let draggedList = null;

    lists.forEach(list => {
        list.addEventListener('dragstart', () => {
            draggedList = list;
            setTimeout(() => list.classList.add('dragging'), 0);
        });

        list.addEventListener('dragend', () => {
            setTimeout(() => {
                list.classList.remove('dragging');
                draggedList = null;
            }, 0);
        });

        list.addEventListener('dragover', e => {
            e.preventDefault();
            const draggingList = document.querySelector('.list.dragging');
            const afterElement = getDragAfterElement(list.parentNode, e.clientX);
            if (afterElement == null) {
                list.parentNode.appendChild(draggingList);
            } else {
                list.parentNode.insertBefore(draggingList, afterElement);
            }
        });
    });

    function getDragAfterElement(container, x) {
        const draggableElements = [...container.querySelectorAll('.list:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});

function addCard(button) {
    const cardText = prompt('Enter card text:');
    if (cardText) {
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.setAttribute('draggable', 'true');
        newCard.textContent = cardText;

        const parentList = button.parentElement;
        const firstCard = parentList.querySelector('.card');
        
        if (firstCard) {
            parentList.insertBefore(newCard, firstCard);
        } else {
            parentList.insertBefore(newCard, button);
        }

        newCard.addEventListener('dragstart', () => {
            draggedCard = newCard;
            setTimeout(() => newCard.classList.add('dragging'), 0);
        });

        newCard.addEventListener('dragend', () => {
            setTimeout(() => {
                newCard.classList.remove('dragging');
                draggedCard = null;
            }, 0);
        });
    }
}


function addList() {
    const listName = prompt('Enter list name:');
    if (listName) {
        const newList = document.createElement('div');
        newList.classList.add('list');
        newList.setAttribute('draggable', 'true');

        const listTitle = document.createElement('h3');
        listTitle.textContent = listName;

        const addCardButton = document.createElement('div');
        addCardButton.classList.add('add-card');
        addCardButton.textContent = '+ Add a card';
        addCardButton.setAttribute('onclick', 'addCard(this)');

        newList.appendChild(listTitle);
        newList.appendChild(addCardButton);

        document.getElementById('board').appendChild(newList);

        newList.addEventListener('dragstart', () => {
            draggedList = newList;
            setTimeout(() => newList.classList.add('dragging'), 0);
        });

        newList.addEventListener('dragend', () => {
            setTimeout(() => {
                newList.classList.remove('dragging');
                draggedList = null;
            }, 0);
        });

        newList.addEventListener('dragover', e => {
            e.preventDefault();
            const draggingList = document.querySelector('.list.dragging');
            const afterElement = getDragAfterElement(newList.parentNode, e.clientX);
            if (afterElement == null) {
                newList.parentNode.appendChild(draggingList);
            } else {
                newList.parentNode.insertBefore(draggingList, afterElement);
            }
        });
    }
}
