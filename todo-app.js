'use strict';

(function() {
    function createAppTitle(title) {
        const appTitle = document.createElement('h2');
        appTitle.textContent = title;
        return appTitle;
    }

    function createTodoItemForm() {
        const form = document.createElement('form'),
              input = document.createElement('input'),
              buttonWrapper = document.createElement('div'),
              button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        button.disabled = true;
        input.addEventListener('input', () => {
            button.disabled = false;
            if (!input.value.trim()) {
                button.disabled = true;
            }
        });

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        const list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(obj, lsArr, lsName) {
        const item = document.createElement('li'),
              title = document.createElement('h5'),
              buttonGroup = document.createElement('div'),
              doneButton = document.createElement('button'),
              deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        title.textContent = obj.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        if (obj.done) {
            item.classList.add('list-group-item-success');
        }

        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(title);
        item.append(buttonGroup);

        doneButton.addEventListener('click', () => {
            if (!item.classList.contains('list-group-item-success')) {
                item.classList.add('list-group-item-success');
                obj.done = true;
                localStorage.setItem(lsName, JSON.stringify(lsArr));
            } else {
                item.classList.remove('list-group-item-success');
                obj.done = false;
                localStorage.setItem(lsName, JSON.stringify(lsArr));
            }
        });

        deleteButton.addEventListener('click', () => {
            if (confirm('Вы уверены?')) {
                let indexElemRemoved = null;
                lsArr.find((itemArr, i) => {
                    if (itemArr.name === title.textContent) {
                        indexElemRemoved = i;
                    }
                });
                lsArr.splice(indexElemRemoved, 1);
                localStorage.setItem(lsName, JSON.stringify(lsArr));
                item.remove();
            }
        });

        return item;
    }

    function createTodoApp(container, title='Список дел', arr = false) {
        const localStorageArr = [],
              todoAppTitle = createAppTitle(title),
              todoItemForm = createTodoItemForm(),
              todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        if (arr.length) {
            arr.forEach((itemObj) => {
                const arrItem = createTodoItem(itemObj, localStorageArr, title);
                todoList.append(arrItem);
            });
        }

        if (localStorage.getItem(title)) {
            const lsItems = JSON.parse(localStorage.getItem(title));
            lsItems.forEach(lsItem => todoList.append(createTodoItem(lsItem, localStorageArr, title)));
        }

        todoItemForm.form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!todoItemForm.input.value.trim()) {
                todoItemForm.input.value = '';
                return;
            }

            const userItemObj = {
                name: todoItemForm.input.value,
                done: false
            };

            localStorageArr.push(userItemObj);
            localStorage.setItem(title, JSON.stringify(localStorageArr));

            const todoItem = createTodoItem(userItemObj, localStorageArr, title);
            todoList.append(todoItem);
            todoItemForm.input.value = '';
            todoItemForm.button.disabled = true;
        });
    }

    window.createTodoApp = createTodoApp;
})();
