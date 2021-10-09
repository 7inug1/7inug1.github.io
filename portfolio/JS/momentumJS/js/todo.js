const toDoList = document.querySelector('.todo-list');
const toDoLists = toDoList.getElementsByTagName('li');
let todos = [];

// <event delegation - implement 예정>
// toDoList.addEventListener('click', (event) => {
//   console.log(event.target);
// });
// console.log(toDoLists);

// <localStorage>
const TODOS_KEY = 'todo';
const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  todos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}
function paintToDo(newToDo) {
  // console.log(newToDo);
  // for new item to add
  const listItem = document.createElement('div');
  const li = document.createElement('li');
  li.setAttribute('data-editable', !!false);
  li.id = newToDo.id;
  listItem.className = 'list-item';
  listItem.innerText = newToDo.text;

  // var declaration
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-container';
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.innerText = '❌';
  const editButton = document.createElement('button');
  editButton.className = 'edit-button';
  editButton.innerText = '✏️';

  deleteButton.addEventListener('click', removeToDo);
  editButton.addEventListener('click', clickEditToDoButton);
  li.addEventListener('dblclick', clickEditToDoButton);

  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);
  li.appendChild(listItem);
  li.appendChild(buttonContainer);
  toDoList.appendChild(li);
}

// <todo-input field>
const toDoForm = document.querySelector('.todo-form');
const toDoInput = document.querySelector('.todo-form input');
toDoForm.addEventListener('submit', submitToDoForm);
function submitToDoForm(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = '';

  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
  };

  todos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDos();
}

// <sorting>
const alphabeticalSortButton = document.querySelector(
  '.alphabetical-sort-button'
);
const dateSortButton = document.querySelector('.date-sort-button');

alphabeticalSortButton.addEventListener('click', alphabeticalSortToDos);
dateSortButton.addEventListener('click', dateSortToDos);

let alphabeticalIsAscending = false;
let dateIsAscending = false;
function alphabeticalSortToDos() {
  toDoList.innerHTML = '';

  console.log(toDoList.childNodes);
  if (!alphabeticalIsAscending) {
    alphabeticalIsAscending = !alphabeticalIsAscending;
    todos.sort((a, b) => {
      if (a.text.toLowerCase() < b.text.toLowerCase()) {
        return -1;
      } else if (a.text.toLowerCase() > b.text.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    alphabeticalIsAscending = !alphabeticalIsAscending;
    todos.sort((a, b) => {
      console.log(Number.isInteger(a));
      // if (Number.isInteger(a) && Number.isInteger(b)) {
      //   return a - b;
      // }

      if (a.text.toString().toLowerCase() > b.text.toString().toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  console.log(todos);

  todos.forEach(paintToDo);
}

function dateSortToDos() {
  // 리스트 지우기
  toDoList.innerHTML = '';
  // sort 시스틈 (by id)로 만들기 - 2가지
  if (!dateIsAscending) {
    dateIsAscending = !dateIsAscending;
    todos.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      } else {
        return 1;
      }
    });
  } else {
    dateIsAscending = !dateIsAscending;
    todos.sort((a, b) => {
      if (a.id > b.id) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  todos.forEach(paintToDo);
}

// <remove>
function removeToDo(event) {
  if (confirm('Delete this ToDo?')) {
    const li = event.target.closest('li');
    li.remove();
    todos = todos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
  }
}

// <todo edit>
let originalToDo = '';
let editedLI = '';
// 리스트 더블클릭 OR 수정 버튼 클릭
function clickEditToDoButton(event) {
  console.log('before', editedLI);
  console.log(typeof editedLI);
  if (typeof editedLI === 'object') {
    closeInputField(editedLI);
  }
  const ul = event.target.closest('ul');
  const li = event.target.closest('li');
  const lists = ul.getElementsByTagName('li');
  const listItem = li.querySelector('.list-item');
  const buttonContainer = li.querySelector('.button-container');
  const editButton = buttonContainer.querySelector('.edit-button');
  const deleteButton = buttonContainer.querySelector('.delete-button');

  editButton.classList.add(CLASSNAME_HIDDEN);
  deleteButton.classList.add(CLASSNAME_HIDDEN);

  originalToDo = listItem.innerText;
  console.log(ul);
  // console.log(li);
  li.setAttribute('data-editable', !!true);

  li.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeInputField(event);
    }
  });

  editedLI = event;
  console.log('after', editedLI);

  // for (let i = 0; i < lists.length; i++) {
  //   if (lists[i].dataset.editable == 'true') {
  //     if (li.id !== lists[i].id) {
  //       lists[i].setAttribute('data-editable', !!false);
  //       // closeInputField(event);
  //     }
  //   }
  // }
  // console.log(li.dataset.editable);
  // edit-input-container 아예 없을 때
  if (li.querySelector('.edit-input-container') === null) {
    // console.log(event.target.closest('li').id);
    // edit-related var declaration
    const editInputContainer = document.createElement('div');
    const editInputForm = document.createElement('form');
    editInputForm.className = 'edit-input-form';
    const editInput = document.createElement('input');
    const submitButton = document.createElement('button');

    editInputContainer.className = 'edit-input-container';
    editInput.type = 'text';
    editInput.required = true;
    submitButton.className = 'submit-button';
    submitButton.type = 'submit';
    submitButton.innerText = '✔️';
    editInputContainer.appendChild(editInput);
    editInputForm.appendChild(editInputContainer);
    editInputForm.appendChild(submitButton);
    li.prepend(editInputForm);

    editInput.value = originalToDo;
    editInput.select();
    listItem.classList.add(CLASSNAME_HIDDEN);
    editInputForm.addEventListener('submit', submitConfirmEditToDo);
  } else {
    // console.log(event.target);
    const editInputForm = li.querySelector('.edit-input-form');
    const editInputContainer = li.querySelector('.edit-input-container');
    const editInput = editInputContainer.querySelector('input');
    const submitButton = editInputForm.querySelector('.submit-button');

    editInputForm.classList.remove(CLASSNAME_HIDDEN);
    editInput.value = originalToDo;
    listItem.classList.add(CLASSNAME_HIDDEN);
    submitButton.classList.remove(CLASSNAME_HIDDEN);

    editInput.select();
    editInputForm.addEventListener('submit', submitConfirmEditToDo);
  }
  li.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeInputField(event);
    }
  });
}

// <todo edited submit>
function submitConfirmEditToDo(event) {
  console.log('submitConfirmEditToDo');
  const li = event.target.closest('li');
  const listItem = li.querySelector('.list-item');
  const editInputForm = li.querySelector('.edit-input-form');
  const editInputContainer = editInputForm.querySelector(
    '.edit-input-container'
  );
  const editInput = editInputContainer.querySelector('input');

  closeInputField(event);

  if (editInput.value !== originalToDo) {
    console.log('editInput.value !== originalToDo');
    const textToReplace = editInput.value;
    const textToBeReplaced = listItem;
    textToBeReplaced.innerText = textToReplace;
    // 좀 더 깔끔히 만드는 법 있을지?
    todos.forEach((todo) => {
      if (todo.id == li.id) {
        todo.text = textToReplace;
      }
    });
    saveToDos();

    editInput.value = '';
  }
}

//
function closeInputField(event) {
  console.log(event);
  console.log('closeinputfield');
  event.preventDefault();
  console.log(event.target);
  const li = event.target.closest('li');
  const listItem = li.querySelector('.list-item');
  const editInputForm = li.querySelector('.edit-input-form');
  const editInputContainer = editInputForm.querySelector(
    'edit-input-container'
  );

  const buttonContainer = li.querySelector('.button-container');
  const submitButton = editInputForm.querySelector('.submit-button');
  const editButton = buttonContainer.querySelector('.edit-button');
  const deleteButton = buttonContainer.querySelector('.delete-button');

  li.setAttribute('data-editable', false);

  editButton.classList.remove(CLASSNAME_HIDDEN);
  deleteButton.classList.remove(CLASSNAME_HIDDEN);
  submitButton.classList.add(CLASSNAME_HIDDEN);

  listItem.classList.remove(CLASSNAME_HIDDEN);
  editInputForm.classList.add(CLASSNAME_HIDDEN);
}
