/* ------------------------------ TASK 9 ---------------------------------------------------------------
Sukurkite konstruktoriaus funkciją "Movie" (naudokte ES6), kuri sukuria objektus 3 savybėm ir 1 metodu:

Savybės:
title, director, budget
Metodas: 
wasExpensive() - jeigu filmo budget bus didesnę nei 100 000 000 mln USD, tada gražins true, kiru atveju false 
------------------------------------------------------------------------------------------------------ */

class Inputs {
    constructor(title, director, budget) {
      this.title = title;
      this.director = director;
      this.budget = budget;
    }

    wasExpensive() {
        return this.budget > 100000000
    }
}

function createInput(title, director, budget) {
    const input = new Inputs(title, director, budget);
    input.wasExpensive();
}

createInput("Worst movie ever!", "Belzebub", 100000001)