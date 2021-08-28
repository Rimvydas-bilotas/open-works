/* ------------------------------ TASK 3 -----------------------------------
Parašykite JS kodą, kuris leis vartotojui paspaudus ant mygtuko "Show users"
pamatyti vartotojus iš Github API (endpoint'as pateiktas žemiau).

Paspaudus mygtuką "Show users":
1. Pateikiamas informacijos atvaizdavimas <div id="output"></div> bloke
1.1. Infrmacija, kuri pateikiama: "login" ir "avatar_url" reikšmės (kortelėje)
2. Žinutė "Press "Show Users" button to see users" turi išnykti;
"
Pastaba: Informacija apie user'į (jo kortelė) bei turi turėti bent minimalų stilių;
-------------------------------------------------------------------------- */

const ENDPOINT = 'https://api.github.com/users';

document.querySelector("button").addEventListener("click", e => {
    fetch(ENDPOINT)
      .then(data => data.json())
      .then(data => cards(data))
  
    function cards(data) {
      const carField = document.getElementById("output");
        carField.innerHTML = ""
        data.forEach(element => {
        const card = document.createElement("div");
        card.classList.add("card");
        const picture = document.createElement("img");
        picture.classList.add("imge");
        const login = document.createElement("p");
        login.classList.add("login");
        picture.src = element.avatar_url;
        login.append(element.login);
        card.append(picture, login);
        carField.append(card);
      });
    }
  })