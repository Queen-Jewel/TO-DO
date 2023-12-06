const addItem = document.getElementById("additem");
const addBtn = document.getElementById("addList");
const container = document.querySelector("#content");
// const subCon = document.querySelector('ul');
const remove = document.querySelectorAll('#content ul li span .remove');

const todoList = async () => {
  let url = 'http://localhost:3000/list';

  const list = await fetch(url);
  const lists = await list.json();

  console.log(lists);

  let template = '';
  lists.forEach(list => {
    template += `
    <ul>
          <li class="flex-row">
            <label class="list-item">
              <input type="checkbox" name="todoitem" checked />
              <span class="checkmark"></span>
            <span class="text">${list.name}</span>
            </label>
            <span class="remove"></span>
          </li>
    `;
  })

  container.innerHTML = template;
}

const createList = async (e) => {
    e.preventDefault();
const newList = addItem.value;

const data = {
    name: newList
}

try {
    const rest = await fetch('http://localhost:3000/list', {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await rest.json();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}




addBtn.addEventListener('click', createList);
// remove.addEventListener('click', async (e)=> {
//     const res = await fatch('http://localhost:3000/list' + id, {
//         method: 'DELETE'
// });

window.addEventListener('DOMContentLoaded', () => todoList());


