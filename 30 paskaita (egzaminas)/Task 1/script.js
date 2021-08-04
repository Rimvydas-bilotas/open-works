/* ------------------------------ TASK 1 ----------------------------
Parašykite JS kodą, kuris leis vartotojui įvesti svorį kilogramais ir
pamatyti jo pateikto svorio kovertavimą į:
1. Svarus (lb) | Formulė: lb = kg * 2.2046
2. Gramus (g) | Formulė: g = kg / 0.0010000
3. Uncijos (oz) | Formul4: oz = kg * 35.274

Pastaba: atvaizdavimas turi būti matomas pateikus formą ir pateikiamas
<div id="output"></div> viduje, bei turi turėti bent minimalų stilių;
------------------------------------------------------------------- */

document.querySelector("form").addEventListener('submit', e => {
    e.preventDefault();
    // alert("yes");
    const kg = document.getElementById('search').value;
    const lb = kg * 2.2046;
    const g = kg / 0.0010000;
    const oz = kg * 35.274;
    const returnField = document.querySelector("div[id=output]");
    console.log(oz);
    returnField.innerHTML = lb + " lb<br>" + g + " g<br>" + oz + " oz"
})