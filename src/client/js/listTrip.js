const listTrip = async (data) => {
  const list = document.getElementById("list-trip");
  const li = document.createElement("li");
  const removeBtn = document.createElement("button");
  try {
    li.innerHTML = JSON.parse(data).city;
    removeBtn.innerHTML = "X";

    // removeBtn.addEventListener('click', ()=> )

    li.appendChild(removeBtn);
    list.appendChild(li);

    return list;
  } catch (err) {
    console.log(err);
  }
};
export { listTrip };
