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
        const holder = document.createElement("div");
        const city = document.createElement("p");
        const dateList = document.createElement("ul");
        const startDate = document.createElement("li");
        const endDate = document.createElement("li");
        const removeBtn = document.createElement("button");

        city.innerHTML = item.city;

        startDate.innerHTML = "Arrival Date: " + item.start;
        endDate.innerHTML = "Departure Date: " + item.end;

        removeBtn.innerHTML = "X";
        removeBtn.title = "Remove trip";

        dateList.appendChild(startDate);
        dateList.appendChild(endDate);

        holder.appendChild(city);
        holder.appendChild(dateList);

        li.appendChild(holder);
        li.appendChild(removeBtn);

        button(removeBtn, item.id);

        list.appendChild(li);
      });
    })
    .catch((err) => console.error(err));
};
export { listTrip };
