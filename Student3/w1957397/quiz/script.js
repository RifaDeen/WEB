//This code assigns DOM elements to variables using querySelector
const questionNumber=document.querySelector(".queNumber");
const questionText=document.querySelector(".questionText");
const optionContainer=document.querySelector(".options");
const homeBox=document.querySelector(".home-box");
const quizBox=document.querySelector(".quiz");
const answersIndicatorContainer=document.querySelector(".answers-indicator");
const resultBox=document.querySelector(".results");

//initializing variables
let questionCount=0;
var timer=0;
let correctAnswers=0;
let availableQuestions=[];
let availableOptions=[];
let currentQuestion;
let attempt=0;
var currentTime=0;
var feedBack;

//push the questions into availableQuestions Array
function setQuestions(){
    const totalQuestions=10;
    for(let i=0;i<totalQuestions;i++){
        availableQuestions.push(quiz[i])
    }
}
function getQuestions(){
    //setting the question number
    questionNumber.innerHTML="Question "+(questionCount+1)+" of "+10;
    //getting random question using math.random method
    const questionIndex=availableQuestions[Math.floor(Math.random()*availableQuestions.length)]
    currentQuestion=questionIndex;
    questionText.innerHTML=currentQuestion.q;
    //get the position of questionIndex from the availableQuestion Array;
    const index1=availableQuestions.indexOf(questionIndex);
    //remove the questionIndex from the availableQuestion array, so that the question will not repeat
    availableQuestions.splice(index1,1)
    //show image questions if exists
    if (currentQuestion.hasOwnProperty('img')){
        const img=document.createElement("img");
        img.src=currentQuestion.img;
        questionText.appendChild(img);
    }
    //Displaying the options
    //get the length of options
    const optionLength=currentQuestion.options.length
    for(let i=0;i<optionLength;i++){
        availableOptions.push(i)
    }
    optionContainer.innerHTML='';
    let animationDelay=0.2;
    //create options in html
    for(let i=0;i<optionLength;i++){
        //generating random options using random array
        const optionIndex=availableOptions[Math.floor(Math.random()*availableOptions.length)];
        //get the position of 'optionIndex'from the availableOptions array
        const index2=availableOptions.indexOf(optionIndex);
        //remove the 'optionIndex'from the availableOptions,
        availableOptions.splice(index2,1);
        const option=document.createElement("div");
        option.innerHTML=currentQuestion.options[optionIndex];
        option.id=optionIndex;
        option.style.animationDelay=animationDelay+'s';
        //incrementing the animation delay by 0.2s
        animationDelay=animationDelay+0.2;
        option.className="option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
    }
    questionCount++
}

//getting the result of current attempt question
function getResult(element){
    const id=parseInt(element.id);
    //get the answer by comparing the id of clicked option
    if(id===currentQuestion.answer){
        //display in green
        element.classList.add("correct");
        //indicate it as corrrect 
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else{
        //adding the wrong answer
        element.classList.add("wrong");
        //displaying the correct answer if the answer selected is incorrect
        const optionLength=optionContainer.children.length;
        for(let i=0;i<optionLength;i++){
            if(parseInt(optionContainer.children[i].id)==currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
        updateAnswerIndicator("wrong");

    }
    attempt++;
    unclickOptions();
}

function unclickOptions(){
    const optionLength=optionContainer.children.length;
    for(let i=0;i<optionLength;i++){
        optionContainer.children[i].classList.add("already-choosed");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML='';
    const totalQuestion=10;
    for(let i=0;i<10;i++){
        const indicator=document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}
function updateAnswerIndicator(type){
    answersIndicatorContainer.children[questionCount-1].classList.add(type)

}

function next(){
    if(questionCount===10){
        quizOver();
    }
    else{
        getQuestions();
    }
}
//timer function
function startTimer() {
    // Set the time for the timer (in seconds)
    var timeLeft = 60;

    // Get the HTML element for the timer
    var timerElement = document.getElementById("time");

    // Update the timer every second
    timer = setInterval(function() {
    // Decrement the time remaining
    timeLeft--;

  // Calculate the minutes and seconds remaining
  var minutes = Math.floor(timeLeft / 60);
  var seconds = timeLeft % 60;

  // Format the time as a two-digit string
  currentTime = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);

  // Update the HTML element with the formatted time
  timerElement.innerHTML = currentTime;

  // Stop the timer if time runs out
  if (timeLeft <= 0) {
    clearInterval(timer);
    var timer_message = "Time's up!";
    alert(timer_message);
    quizOver()

  }
}, 1000);
}

//Starting point of the program
function startQuiz(){
    //start timer
    startTimer();
    //hide home box
    homeBox.classList.add("hide");
    //show quiz box
    quizBox.classList.remove("hide");
    //setting all the questions in availableQuestions Array
    setQuestions();
    //calling the getQuestions() function
    getQuestions();
    //indicator for answers
    answersIndicator();
    
   
}

function quizOver(){
    clearInterval(timer);
    //hide quiz quizBox
    quizBox.classList.add("hide");
    //show result Box
    resultBox.classList.remove("hide");
    results();

}
function results(){
    resultBox.querySelector(".total-question").innerHTML=10;
    resultBox.querySelector(".attempts").innerHTML=attempt;
    resultBox.querySelector(".correctCount").innerHTML=correctAnswers;
    resultBox.querySelector(".wrongCount").innerHTML=attempt-correctAnswers;
    const percentage=(correctAnswers/10)*100;
    resultBox.querySelector(".percentage").innerHTML=percentage.toFixed(2)+"%";
    resultBox.querySelector(".finalScore").innerHTML=correctAnswers+"/"+10;
    resultBox.querySelector(".total-time").innerHTML= currentTime ;
    if (percentage >= 75) {
        // Add a line break before the message
        var lineBreak = document.createElement("br");
        feedBack = document.createElement("p");
        resultBox.appendChild(lineBreak);
        feedBack.innerHTML = "Wow, nice effort! You did a great job on this quiz!";
        feedBack.style.color = "green";
        feedBack.style.fontSize="25px";
        resultBox.appendChild(feedBack);
    }else if (percentage < 75) {
        // Add a line break before the message
        var lineBreak = document.createElement("br");
        feedBack = document.createElement("p");
        resultBox.appendChild(lineBreak);
        feedBack.innerHTML = "**** Better luck next time!!! ****";
        feedBack.style.color = "red";
        feedBack.style.fontSize="25px";
        resultBox.appendChild(feedBack);
    }
}
function tryAgain(){
    //hide the result boz
    resultBox.classList.add("hide");
    //show the quiz box
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function resetQuiz(){
    questionCount=0;
    correctAnswers=0;
    attempt=0;
    resultBox.removeChild(feedBack);
    
}
