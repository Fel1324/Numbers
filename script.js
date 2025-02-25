"use strict";

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
    this.prizeDraw = {
      numbers: Number(numbers),
      starts: Number(starts),
      end: Number(end),
    };
  }

  draw(){
    try{
      const value = this.prizeDraw.numbers;
      const min = Math.floor(this.prizeDraw.starts);
      const max = Math.floor(this.prizeDraw.end);
  
      const error = this.validate(value, min, max);
      if(error) throw new Error(error);
  
      for(let i = 0; i < this.prizeDraw.numbers; i++){
        console.log(Math.floor(Math.random() * (max - min + 1) + min));
      }

    } catch(error){
      alert(String(error).replace("Error: ", ""));
    }
  }

  validate(value, min, max){
    if(value < 1 || min < 1 || max < 1){
      return "Nenhum dos campos pode estar vazio ou ser igual a zero!"
    }

    if(min >= max){
      return "O número minímo não pode ser igual nem maior que o máximo!";
    }

    if(value > 100){
      return "O máximo de números que podem ser sorteados é 100!"
    }

    if(max > 999){
      return "O máximo não pode ser mais do que 999!"
    }
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const numberDrawer = new NumberDrawer(
    numbersEl.value,
    startsEl.value,
    endEl.value,
  );

  numberDrawer.draw();  
});