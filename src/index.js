let time = 1; // Time value of the timer function
let counter = 0; // Counter of the current input
let level=-1; // Exercise level of the JSON data , move getData function
let currentTime; // variable of the timer function
let resultFieldOutput = ``; // resultField place , show with createResultField function and hide with click startButton
let totalLevel = 0; // Keep total level
let challengeData; // Current datas in json

const challengeInput = document.getElementById('challengeInputField');
const inputText = document.getElementById('inputText');
const nextButton = document.getElementById('nextButton');
const mainpart = document.querySelectorAll('#mainPart');
const gameInfo = document.getElementById('gameInfo');
const againButton = document.getElementById('againButton');
const resultField = document.getElementById('resultField');
const challengeDataField = document.getElementById('challengeDataField');
const timeField = document.getElementById('timeField');
const levelButtons = document.getElementById('levelButtons');
const levelInfo =  document.getElementById('levelInfo');
const dropdownControl = document.getElementById('dropdownControl');
const dropdownButton = document.getElementById('dropdownList');
const startButton = document.getElementById('startButton');

document.addEventListener("DOMContentLoaded", function() { 
    localStorage.removeItem('trues');
    getData();
  });

startButton.addEventListener('click',function(){
    for(let mainAttrLen=0;mainAttrLen<mainpart.length;mainAttrLen++){
        mainpart[mainAttrLen].classList.add('setAttr');
    }
    createLevelButtons(challengeData);
    challengeInput.classList.add('active');
    dropdownControl.classList.add('active');
    gameInfo.classList.add('disabled');
    againButton.classList.remove('active'); //After press next button,this will be hidden
    resultField.innerHTML=``;
    level++;
    createField(challengeData,level);
    currentTime = setInterval(timer, 1000);
});

nextButton.addEventListener('click',function(){
    for(let mainAttrLen=0;mainAttrLen<mainpart.length;mainAttrLen++){
        mainpart[mainAttrLen].classList.add('setAttr');
    }
    createLevelButtons(challengeData);
    challengeInput.classList.add('active');
    nextButton.classList.remove('active');
    dropdownControl.classList.add('active');
    gameInfo.classList.add('disabled');
    againButton.classList.remove('active'); //After press next button,this will be hidden
    resultField.innerHTML=``;
    level++;
    createField(challengeData,level);
    currentTime = setInterval(timer, 1000);
});

againButton.addEventListener('click',function(){
    challengeInput.classList.add('active');
    againButton.classList.remove('active');
    nextButton.classList.remove('active');
    dropdownControl.classList.add('active');
    resultField.innerHTML=``;
    createField(challengeData,level);
    currentTime = setInterval(timer, 1000);
});

inputText.addEventListener('input',function(event){
    let keyValue = event.data;
    let currentSpanValue = challengeDataField.childNodes[counter].innerHTML;
    disabledBackspace();

    let lastValueCheck = challengeDataField.childNodes[counter+1];
    if(lastValueCheck!=undefined){
        challengeDataField.childNodes[counter+1].classList.add('current');
        compareValues(keyValue,currentSpanValue);  
        challengeDataField.childNodes[counter].classList.remove('current');
        counter++;
        
    }
    else{
        compareValues(keyValue,currentSpanValue);
        challengeDataField.childNodes[counter].classList.remove('current');
        resultOfChallenge();
        counter=0;
    }

});

function timer() {
    timeField.innerHTML ='<i class="far fa-clock"></i>  '+time+'sec';
    time++;
}

function resultOfChallenge(){
    clearInterval(currentTime);
    dropdownControl.classList.remove('active');
    challengeInput.classList.remove('active');
    if(level!=totalLevel){
        nextButton.classList.add('active');
    }
    againButton.classList.add('active');
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
    let score = Math.ceil(resultLength/(time-1));
    let emoji;
    if(score>=7){
        emoji = "grin-stars";
    }
    else if(score >= 5){
        emoji = "smile";
    }
    else if(score >= 1){
        emoji = "flushed";
    }
    else{
        emoji = "sad-cry";
    }
    resultFieldOutput = `<div class="alert alert-warning" role="alert">
                            <p class="result"> <b>Number of true(s):</b> ${resultLength} </p>
                            <p class="result"> <b>Time:</b> ${time-1} sec </p>
                            <p class="result"> <b>Score:</b> ${score}(represent) </p>
                            <p class="result"> <i class="far fa-${emoji} fa-2x"></i>  </p>
                        </div>`;
    
    resultField.innerHTML=resultFieldOutput;
}

function compareValues(keyValue,currentSpanValue){
    if(keyValue==currentSpanValue){
        challengeDataField.childNodes[counter].classList.add('true');
        const trueSound=new Audio('sounds/true.mp3');
        trueSound.play();
        setLocalStorage();
    }
    else{
        challengeDataField.childNodes[counter].classList.add('false');
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
    challengeDataField.innerHTML=output;
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
        levelFieldOutput+=`<button id="${levelCounter+1}" class="levelBtn levelBtnControl">Level ${levelCounter+1}</button>`;        
        }
      dropdownButton.innerHTML=levelFieldOutput;
      controlLevelButtons();
  }

  function controlLevelButtons(){
    for(let currentButton = 0 ; currentButton<dropdownButton.children.length ; currentButton++){
        dropdownButton.children[currentButton].addEventListener('click',function(){
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
