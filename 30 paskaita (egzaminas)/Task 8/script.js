/* ------------------------------ TASK 8 --------------------------------------------
Sukurkite konstruktoriaus funkciją "Calculator" (naudokite ES5), kuri sukuria objektus su 3 metodais:
sum() - priima du skaičius ir grąžina jų sumą.
subtraction() - priima du skaičius ir grąžina jų skirtumą.
multiplication() - priima du skaičius ir grąžina jų daugybos rezultatą;
division() - priima du skaičius ir grąžina jų dalybos rezultatą;
------------------------------------------------------------------------------------ */

class Inputs {
    constructor(number1, number2) {
      this.number1 = number1;
      this.number2 = number2;
    }
  
    sum() {
        console.log(this.number1 + this.number2);
    }
    subtraction() {
        console.log(this.number1 - this.number2)
    }
    multiplication() {
        console.log(this.number1 * this.number2)
    }
    division() {
        console.log(this.number1 / this.number2)
    }
  }
  
  function calcula(number1, number2) {
    const input = new Inputs(number1, number2);
    input.sum();
    input.subtraction();
    input.multiplication();
    input.division();
  }
  calcula(2,2)