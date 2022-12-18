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

    function createTodoItem(name) {
        const item = document.createElement('li'),
             buttonGroup = document.createElement('div'),
             doneButton = document.createElement('button'),
             deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };
    }

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.querySelector('#todo-app');

        const todoAppTitle = createAppTitle('Список дел'),
              todoItemForm = createTodoItemForm(),
              todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        todoItemForm.form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!todoItemForm.input.value.trim()) {
                todoItemForm.input.value = '';
                return;
            }

            const todoItem = createTodoItem(todoItemForm.input.value);

            todoItem.doneButton.addEventListener('click', () => {
                todoItem.item.classList.toggle('list-group-item-success');
            });

            todoItem.deleteButton.addEventListener('click', () => {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                }
            });

            todoList.append(todoItem.item);

            todoItemForm.input.value = '';
        });
    });
})();