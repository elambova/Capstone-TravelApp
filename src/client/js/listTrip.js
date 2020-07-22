const localhost = "http://localhost:8081/";

function deleteData(id) {
  return fetch(`${localhost}:${id}`, {
    method: "delete",
  }).then((response) =>
    response.json().then((json) => {
      return json;
    })
  );
}

const button = (button, id) => {
  button.addEventListener("click", () => {
    deleteData(id);
    localStorage.clear();
    button.parentNode.parentNode.removeChild(button.parentNode);
  });
};

const listTrip = () => {
  const list = document.getElementById("list-trip");

  fetch(`${localhost}all`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.map((item) => {
        const li = document.createElement("li");
        const removeBtn = document.createElement("button");

        li.innerHTML = item.city;
        removeBtn.innerHTML = "X";
        li.appendChild(removeBtn);
        button(removeBtn, item.id);

        list.appendChild(li);
      });
    })
    .catch((err) => console.error(err));
};
export { listTrip };
