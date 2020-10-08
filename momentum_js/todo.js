const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LOCALSTORAGE = "toDos";

let toDosArray = [];
// cleanToDos is to make sure that the list is gone upon refreshing the page
function deleteToDo(event) {
  const button = event.target;
  const li = button.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDosArray.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDosArray = cleanToDos;
  saveToDos();
}

//storage tends to save items in strings.
function saveToDos() {
  localStorage.setItem(TODOS_LOCALSTORAGE, JSON.stringify(toDosArray));
}

initialize();

function initialize() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

function loadToDos() {
  //loadedToDos is the stringified item. We are parsing it
  //back to make it work as an object
  const loadedToDos = localStorage.getItem(TODOS_LOCALSTORAGE);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);

    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function paintToDo(text) {
  const li = document.createElement("li");
  const deleteButton = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDosArray.length + 1;

  deleteButton.innerText = "❌";
  deleteButton.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(deleteButton);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDosArray.push(toDoObj);
  saveToDos();
}
