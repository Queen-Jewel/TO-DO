const addItem = document.getElementById("additem");
const addBtn = document.getElementById("addList");
const container = document.querySelector("#content");
// const subCon = document.querySelector('ul');

const todoList = async () => {
  let url = "http://localhost:3000/list";

  const list = await fetch(url);
  const lists = await list.json();

  console.log(lists);

  let template = "";
  lists.forEach((list) => {
    template += `
    <ul>
          <li class="flex-row" data-id="${list.id}">
            <label class="list-item">
              <input type="checkbox" name="todoitem" checked />
              <span class="checkmark"></span>
            <span class="text">${list.name}</span>
            </label>
            <span class="remove"></span>
          </li>
          </ul>
    `;
  });

  container.innerHTML = template;


  // Delete item
  const removebtns = document.querySelectorAll(".remove");

  for (let i = 0; i < removebtns.length; i++) {
    let removebtn = removebtns[i];

    removebtn.addEventListener("click", async (list) => {
      const id = removebtn.closest('li').getAttribute('data-id');

      if (id) {
        const res = await fetch("http://localhost:3000/list/" + id, {
          method: "DELETE",
        });
      } else {
        console.log('error');
      }
    });
  }
};

const createList = async (e) => {
  e.preventDefault();
  const newList = addItem.value;

  const data = {
    name: newList,
  };

  try {
    const rest = await fetch("http://localhost:3000/list", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await rest.json();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
// Cross Text
const text = document.getElementsByClassName("text");
const inputText = document.getElementsByClassName("list-item");


crossText = (text) => text.style.textDecoration = "line-through";

inputText.addEventListener("Click", () => crossText());

addBtn.addEventListener("click", createList);

window.addEventListener("DOMContentLoaded", () => todoList());
