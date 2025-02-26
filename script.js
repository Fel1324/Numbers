"use strict";

const main = document.querySelector(".main");
const mainDraw = document.querySelector("#mainDraw");
const mainResults = document.querySelector("#mainResults");

const formEl = document.querySelector("#form");
const numbersEl = document.querySelector("#numbers");
const startsEl = document.querySelector("#starts");
const endEl = document.querySelector("#end");
const repeatNumberEl = document.querySelector("#repeatNumber");

const numbersList = [];

[numbersEl, startsEl, endEl].forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D+/g, "");
  })
});

class NumberDrawer {
  constructor(numbers, starts, end){
    const error = this.validate(numbers, starts, end);
    if(error) throw new Error(error);

    this.numbers = Number(numbers);
    this.starts = Number(starts);
    this.end = Number(end);
  }

  draw(){
    let num;

    if(repeatNumberEl.checked){
      if(this.numbers > (this.end - this.starts) + 1){
        throw new Error("Não há quantidade de números suficientes dentro deste intervalo!");
      }

      while(numbersList.length + 1 <= this.numbers){
        num = Math.floor(Math.random() * (this.end - this.starts + 1) + this.starts);
        if(numbersList.indexOf(num) === -1) numbersList.push(num);
      }

    } else {
      while(numbersList.length + 1 <= this.numbers){
        num = Math.floor(Math.random() * (this.end - this.starts + 1) + this.starts);
        numbersList.push(num);
      }
    }

    mainDraw.classList.add("hidden");
    mainResults.classList.remove("hidden");

    this.showResults();
  }

  showResults(){
    console.log(numbersList);
  }

  validate(numbers, starts, end){
    if(numbers === "" || starts === "" || end === ""){
      return "Nenhum dos campos pode estar vazio!";
    }

    if(numbers < 1 || end < 1){
      return "A quantidade de números sorteados ou o máximo não podem ser zero!";
    }

    if(Number(starts) >= Number(end)){
      return "O minímo não pode ser igual nem maior que o máximo!";
    }

    if(numbers > 100){
      return "O máximo de números que podem ser sorteados é 100!"
    }

    if(end > 999){
      return "O máximo não pode ser mais do que 999!"
    }
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const numberDrawer = new NumberDrawer(
      numbersEl.value,
      startsEl.value,
      endEl.value,
    );

    numberDrawer.draw();

  } catch(error){
    alert(String(error).replace("Error: ", ""));
  }
});