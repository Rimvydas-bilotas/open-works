function deleteMembership(id) {
  return fetch(`http://127.0.0.1:8080/services/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete membership");
      }

      alert("Membership deleted");
    })
    .catch((error) => alert(error));
}

function callMembershipCards(data) {
    const body = document.getElementById("membership_card_section");
    body.innerHTML = "";
    data.forEach((element) => {
      const mainCard = document.createElement("div");
      mainCard.classList.add('membership_card')
      const innerTextCard = document.createElement("div");
      const innerDeleteButtonCard = document.createElement("div");
      innerDeleteButtonCard.classList.add('inner_delete_card');
      const membership = document.createElement("h3")
      const description = document.createElement("p");
      const deleteButton = document.createElement("button");
      deleteButton.classList.add('delete_button')
      deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>';
      deleteButton.addEventListener("click", async () => {
        await deleteMembership(element._id);
        fetchMemberships();
      });
      membership.innerText = element.price + " " + element.name;
      description.innerText = element.description;
      innerTextCard.append(membership, description);
      innerDeleteButtonCard.append(deleteButton);
      mainCard.append(innerTextCard, innerDeleteButtonCard);
      body.append(mainCard);
    });
  }

function fetchMemberships() {
    fetch(
      `http://127.0.0.1:8080/services/`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("No response");
        }
        return response.json();
      })
      .then((data) => callMembershipCards(data))
      .catch((error) => alert(error));
  }

  fetchMemberships()
  document.getElementById('to_add_membership_button').addEventListener('click', () => {location.href = "./add_membership.html"});