/* ------------------------------ TASK 4 -----------------------------------
Parašykite JS kodą, vartotjui atėjus į tinkaį kreipsis į cars.json failą
ir iš atvaizduos visus automobilių gamintojus ir pagamintus modelius. 
Kiekvienas gamintojas turės savo atvaizdavimo "kortelę", kurioje bus 
nurodomas gamintojas ir jo pagaminti modeliai.


Pastaba: Informacija apie automobilį (brand) (jo kortelė) bei turi turėti 
bent minimalų stilių;
-------------------------------------------------------------------------- */

const ENDPOINT = 'cars.json';

fetch(ENDPOINT)
.then(data => data.json())
.then(data => {
  cards(data)
  })

  function cards(data) {
      data.forEach(element => {
        const cardField = document.getElementById("output");
        const card = document.createElement("div");
        card.classList.add("card");
        const brand = document.createElement("h1");
        const models = document.createElement("div");
        brand.append(element.brand);
        models.append(element.models);
        card.append(brand, models);
        cardField.append(card);
      });
    
  }