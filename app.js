document.addEventListener('DOMContentLoaded', function () {
  M.Tabs.init(document.querySelectorAll('.tabs'));
});

async function displayTodos(data){

  let result = document.querySelector('#result');
  result.innerHTML = '';

  let html = '';

  if ("error" in data){
    html += `<li>Error: Not Logged In</li>`;
  } else {
    for (let todo of data){
      html += `
        <li>
          ${todo.text}
          <input type="checkbox"
            data-id="${todo.id}"
            onclick="toggleDone(event)"
            ${todo.done ? 'checked' : ''}>
          <a onclick="deleteTodo('${todo.id}')">DELETE</a>
        </li>
      `;
    }
  }

  result.innerHTML = html;
}

async function loadView(){
  let todos = await sendRequest('/todos', 'GET');
  displayTodos(todos);
}

loadView();

async function createTodo(event){
  event.preventDefault();

  let form = event.target.elements;

  let data = {
    text: form['addText'].value,
    done: false
  };

  event.target.reset();

  let result = await sendRequest('/todo', 'POST', data);

  toast('Todo Created!');
  loadView();
}

document.forms['addForm'].addEventListener('submit', createTodo);

async function toggleDone(event){
  let checkbox = event.target;
  let id = checkbox.dataset['id'];
  let done = checkbox.checked;

  await sendRequest(`/todo/${id}`, 'PUT', { done });

  toast(done ? "Done!" : "Not Done!");
}

async function deleteTodo(id){
  await sendRequest(`/todo/${id}`, 'DELETE');

  toast("Deleted!");
  loadView();
}

function logout(){
  localStorage.removeItem('access_token');
  window.location.href = "index.html";
}
