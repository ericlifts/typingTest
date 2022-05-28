const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const first = document.querySelector(".top1");
const second = document.querySelector(".top2");
const third = document.querySelector(".top3");



// Run a standard minute/second/hundredths timer:
var minutes = 0;
var seconds = 0;
var hund = 0;
var timer = 0;
var time;
var timerStart = false;

function ourTimer() {
  var stopwatch = zero(minutes) + ':'+ zero(seconds) + ':' + zero(hund);
  //hundredths timer
  hund = Math.floor((timer - seconds * 100) - minutes * 6000); //The Math.floor() function returns the largest integer less than or equal to a given number. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
  //seconds timer
  seconds = Math.floor((timer / 100) - (minutes * 60));
  //minutes timer
  minutes = Math.floor((timer / 6000)); //minutes
  //increases timer by 1
  timer = timer + 1;
  //changes theTimer to the stopwatch on the webpaage
  theTimer.innerHTML = stopwatch;
  return stopwatch;
}

// Add leading zero to numbers 9 or below (purely for aesthetics):
function zero(number) {
  //if the number is less than 10 then set number with a zero in the front
  if(number < 10) {
    number = '0' + number;
  }
  return number;
}
 
// Match the text entered with the provided text on the page:
var leader = []; //array to hold our scores 
var index = 0;
function matchText(){
  
  //set userText to attribute of testArea
  var userText = testArea.value;
  //start at index 0 and ends at last index
  var textToMatch = originText.substring(0,userText.length);
  
  //if the users text is = the origin text letter to letter then the wrapper will be green
  if(userText == textToMatch) { 
    testWrapper.style.borderColor = 'green';
  }
  //if the userText is = to the original text then stop the timer and change the wrapper to hotpink
  if(userText == originText) {
    clearInterval(time);//cancels the timer https://developer.mozilla.org/en-US/docs/Web/API/clearInterval
    testWrapper.style.borderColor = 'hotpink';
    
    leader[index] = theTimer.innerHTML; //set the leader[index] to the time on the timer
    index++; //increment the index by 1
  }
  //wrapper will be red when incorrect letter is typed
  if(userText != textToMatch){
    testWrapper.style.borderColor = 'red';
  } 
  
  leader.sort(); // sort the array leader
  console.log(leader);
  first.innerHTML = leader[0]; // display fastest time on the html page
  second.innerHTML = leader[1]; // display 2nd fastest time on the html page
  third.innerHTML = leader[2]; // display 3rd fastest time on the html page
}

// Start the timer
//set to test area length 
var testingArea = testArea.value.length;
function startTimer() {
  //if the timerStart is false and the testingArea length is 0 then start timer 
  if (timerStart == false && testingArea == 0) {
    timerStart = true;
    time = setInterval(ourTimer, 10); // calls ourTimer function in intervals of 10 miliseconds https://developer.mozilla.org/en-US/docs/Web/API/setInterval 
  }
  
}

// Reset everything
function resetOnClick(){
  //setting all values back to their orginal values when clicking reset
  clearInterval(time);
  time = null;
  timerStart = false;
  minutes = 0;
  seconds = 0;
  hund = 0;
  timer = 0;
  testWrapper.style.borderColor = 'grey';
  testArea.value = '';
  theTimer.innerHTML = '00:00:00';
  
}




// Event listeners for keyboard input and the reset button:
//click event is fired after the mousedown and mouseup have fired 
resetButton.addEventListener('click', resetOnClick);
//keypress event is fired when a key produces a character value pressed down
testArea.addEventListener('keypress', startTimer);
//keyup event is fired when a key is released 
testArea.addEventListener('keyup', matchText);



