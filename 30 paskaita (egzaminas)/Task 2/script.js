/* ------------------------------ TASK 2 ----------------------------
Parašykite JS kodą, kuris skaičiuos kiek kartų buvo paspaustas mygtukas
su tekstu "CLICK ME". Paspaudimų rezultatas turi būti matomas dešinėje
pusėje esančiame "state" skaičiavimo bloke (<div id="btn__state">0</div>)
------------------------------------------------------------------- */

let i = 0;
document.querySelector("div[id=btn__element]").addEventListener("click", e => {
    const counter = document.getElementById('btn__state');
    i++
    counter.innerText = i;
})