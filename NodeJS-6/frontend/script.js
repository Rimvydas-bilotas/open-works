const state = {
  pets: ["dog", "cat", "parrot"],
  isAsc: true,
};

function showPetsInTable(pets) {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  pets.forEach((pet) => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdType = document.createElement("td");
    const tdAge = document.createElement("td");
    const tdDeleteButton = document.createElement("td");
    const deleteButton = document.createElement("button");
    const TdUpdateButton = document.createElement("td");
    const updateButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    updateButton.innerText = "Update";
    deleteButton.addEventListener("click", async () => {
      await deletePet(pet._id);
      fetchPets();
    });
    updateButton.addEventListener('click', () => {
        window.location.href = `add.html?name=${pet.name}&age=${pet.age}&type=${pet.type}&id=${pet._id}`;
    });
    tdDeleteButton.append(deleteButton);
    TdUpdateButton.append(updateButton);
    tdName.innerText = pet.name;
    tdType.innerText = pet.type;
    tdAge.innerText = pet.age;
    tr.append(tdName, tdType, tdAge, tdDeleteButton, TdUpdateButton);
    tableBody.append(tr);
  });
}

function deletePet(id) {
  return fetch(`http://127.0.0.1:8080/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete pet");
      }

      alert("Pet deleted");
    })
    .catch((error) => alert(error));
}

function fetchPets() {
  fetch(
    `http://127.0.0.1:8080/?type=${state.pets.join(",")}&sort=${
      state.isAsc ? "asc" : "dsc"
    }`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("No response");
      }
      return response.json();
    })
    .then((data) => showPetsInTable(data))
    .catch((error) => alert(error));
}

fetchPets();

document.getElementById("age").addEventListener("click", (event) => {
  const text = event.target.innerText;
  if (state.isAsc) {
    event.target.innerText = "Age (Dsc)";
  } else {
    event.target.innerText = "Age (Asc)";
  }

  state.isAsc = !state.isAsc;
  fetchPets();
});

document.querySelectorAll(".petsFilter").forEach((petFilter) => {
  petFilter.addEventListener("click", (e) => {
    e.target.classList.toggle("toggleFilter");
    // debugger;
    const text = e.target.innerText.toLowerCase();
    if (state.pets.includes(text)) {
      state.pets = state.pets.filter((pet) => pet !== text);
    } else {
      state.pets.push(text);
    }
    fetchPets();
  });
});
