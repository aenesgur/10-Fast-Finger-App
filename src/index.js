let time = 1; // Time value of the timer function
let counter = 0; // Counter of the current input
let level=-1; // Exercise level of the JSON data , move getData function
let currentTime; // variable of the timer function
let resultPlace = ``; // resultField place , show with createResultField function and hide with click startButton
let totalLevel = 0; // Keep total level
let challengeData; // Current datas in json

const challengeInput = document.getElementById('CI');
const inputText = document.getElementById('inputText');
const startButton = document.getElementById('startButton');
const mainpart = document.getElementById('mainPart');
const gameInfo = document.getElementById('gameInfo');
const againButton = document.getElementById('againButton');
const resultField = document.getElementById('resultPlace');
const spanValues = document.getElementById('spanValues');
const timePlace = document.getElementById('timePlace');
const levelButtons = document.getElementById('levelButtons');
const levelInfo =  document.getElementById('levelInfo');

document.addEventListener("DOMContentLoaded", function(event) { 
    localStorage.removeItem('trues');
    getData();
  });

document.querySelector('#startButton').addEventListener('click',function(event){
    createLevelButtons(challengeData);
    challengeInput.classList.add('active');
    startButton.classList.add('disabled');
    mainpart.classList.add('setAttr');
    gameInfo.classList.add('disabled');
    levelButtons.classList.add('active');
    againButton.classList.remove('active'); //After press next button,this will be hidden
    startButton.innerHTML='Next<i class="fas fa-chevron-right"></i>';
    resultField.innerHTML=``;
    level++;
    createField(challengeData,level);
    currentTime = setInterval(timer, 1000);
});

document.querySelector('#againButton').addEventListener('click',function(event){
    challengeInput.classList.add('active');
    againButton.classList.remove('active');
    startButton.classList.add('disabled');
    levelButtons.classList.add('active');
    resultField.innerHTML=``;
    createField(challengeData,level);
    currentTime = setInterval(timer, 1000);
});

document.querySelector('#inputText').addEventListener('input',function(event){
    let keyValue = event.data;
    let currentSpanValue = spanValues.childNodes[counter].innerHTML;
    disabledBackspace();

    let lastValueCheck = spanValues.childNodes[counter+1];
    if(lastValueCheck!=undefined){
        spanValues.childNodes[counter+1].classList.add('current');
        compareValues(keyValue,currentSpanValue);  
        spanValues.childNodes[counter].classList.remove('current');
        counter++;
        
    }
    else{
        compareValues(keyValue,currentSpanValue);
        spanValues.childNodes[counter].classList.remove('current');
        resultOfChallenge();
        counter=0;
    }

});

function timer() {
  timePlace.innerHTML ='<i class="far fa-clock"></i>  '+time+'sec';
  time++;
}

function resultOfChallenge(){
    clearInterval(currentTime);
    challengeInput.classList.remove('active');
    if(level!=totalLevel){
        startButton.classList.remove('disabled');
    }
    againButton.classList.add('active');
    levelButtons.classList.remove('active');
    inputText.value="";
    let result= JSON.parse(localStorage.getItem('trues'));
    
    if(result!=null){
        localStorage.removeItem('trues');
        createResultField(result.length,time);
    }
    else{ createResultField(0,time); }
    time=1;
}

function createResultField(resultLength,time){
    let score = resultLength/(time-1);
    resultPlace = `<div class="alert alert-warning" role="alert">
                     <p class="result"> Number of true: ${resultLength} </p>
                     <p class="result"> Time: ${time-1} sec </p>
                     <p class="result"> Score: ${score}(represent) </p>
                    </div>`;
    
    resultField.innerHTML=resultPlace;
}

function compareValues(keyValue,currentSpanValue){
    if(keyValue==currentSpanValue){
        spanValues.childNodes[counter].classList.add('true');
        const trueSound=new Audio('sounds/true.mp3');
        trueSound.play();
        setLocalStorage();
    }
    else{
        spanValues.childNodes[counter].classList.add('false');
        const falseSound=new Audio('sounds/false.mp3');
        falseSound.play();
    }
}

function setLocalStorage(){
    if(localStorage.getItem('trues')==null){   
                var trues = [];
                trues.push("true");
                localStorage.setItem('trues',JSON.stringify(trues));
            }
     else{
                var trues= JSON.parse(localStorage.getItem('trues'));
                trues.push('true');
                localStorage.setItem('trues',JSON.stringify(trues));
            }
}

function getData(){
    fetch('json/data.json')
    .then(response => response.json())
    .then(json => {
        challengeData = json.Exercises;
    });
}

function createField(data,level){
    let exercise=data[level].Ex;
    let output ='';
    for (let i = 0; i < exercise.length; i++) {
      output +=`<div class="valuesCard text-center">${exercise[i]}</div>`;
    }
    spanValues.innerHTML=output;
    totalLevel=data.length-1;
    controlLevelField(level);
}

function controlLevelField(level) {
    let levelInfoOutput=``;
    levelInfoOutput=`Level ${level+1}`;
    levelInfo.innerHTML=levelInfoOutput;
    counter = 0; // move current to startest
    inputText.value="";
    localStorage.removeItem('trues');
}

  function createLevelButtons(data){
      let levelFieldOutput=``;
      for(let levelCounter = 0; levelCounter<data.length; levelCounter++){
          levelFieldOutput+=` <button id="${levelCounter+1}" type="button" class="list-group-item list-group-item-action ">Level ${levelCounter+1}</button>`;
      }
      levelButtons.innerHTML=levelFieldOutput;
      controlLevelButtons();
  }

  function controlLevelButtons(){
    for(let currentButton = 0 ; currentButton<levelButtons.children.length ; currentButton++){
        levelButtons.children[currentButton].addEventListener('click',function(){
            let levelId = this.id;
            level=levelId-1;
            createField(challengeData,level);
            clearInterval(currentTime);
            time=1;
            currentTime = setInterval(timer, 1000);
        });
    }
  }

  function disabledBackspace(){
    window.onkeydown = function (event) {
        if (event.which == 8) { 
             event.preventDefault();   
            }; 
    }; 
}
