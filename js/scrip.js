// Data: List of predefined JavaScript questions and answers
const flashcardsData = [
  {
    question: "What is the difference between var, let, and const?",
    answer: "In JavaScript, var is function-scoped and can be re-declared; let and const are block-scoped, with let allowing re-assignment and const preventing it. However, const objects can have their contents modified."
  },
  {
    question: "What is a Closure in JavaScript?",
    answer: "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment)."
  },
  {
    question: "What is the event loop?",
    answer: "The event loop is a mechanism that allows JavaScript to perform non-blocking I/O operations by offloading tasks to the browser or C++ APIs."
  },
  {
    question: "What is the difference between == and ===?",
    answer: "== compares value equality with type coercion, whereas === compares both value and type without coercion."
  },
  {
    question: "What is a Promise in JavaScript?",
    answer: "A Promise is an object representing the eventual completion or failure of an asynchronous operation and its resulting value."
  },
  {
    question: "What are Arrow Functions?",
    answer: "Arrow functions provide a shorter syntax for writing function expressions and lexically bind the 'this' value."
  },
  {
    question: "What is hoisting?",
    answer: "Hoisting is JavaScript's default behavior of moving declarations (variables and functions) to the top of their containing scope before code execution."
  },
  {
    question: "What is the difference between null and undefined?",
    answer: "undefined means a variable has been declared but not assigned a value. null is an assignment value that represents no value or empty object."
  },
  {
    question: "What is the DOM?",
    answer: "The Document Object Model (DOM) is a programming interface for web documents. It represents the page as nodes and objects."
  },
  {
    question: "What is Event Delegation?",
    answer: "Event delegation is a technique of delegating event handling to a common parent element rather than attaching listeners to individual child elements."
  },
  {
    question: "What does 'this' keyword refer to?",
    answer: "'this' refers to the object it belongs to, depending on how and where the function was called."
  },
  {
    question: "What is async/await?",
    answer: "Async/await is syntactic sugar built on top of Promises, making asynchronous code look and behave more like synchronous code."
  },
  {
    question: "What is Destructuring Assignment?",
    answer: "Destructuring is a JavaScript expression that allows unpacking values from arrays or properties from objects into distinct variables."
  },
  {
    question: "What is the Spread Operator (...)?",
    answer: "The spread operator allows an iterable (like an array or object) to be expanded in places where zero or more arguments/elements are expected."
  },
  {
    question: "What is a Higher-Order Function?",
    answer: "A higher-order function is a function that receives another function as an argument, returns a function, or both."
  },
  {
    question: "What is the purpose of Array.prototype.map()?",
    answer: "The map() method creates a new array populated with the results of calling a provided function on every element in the calling array."
  },
  {
    question: "What is the purpose of Array.prototype.reduce()?",
    answer: "The reduce() method executes a user-supplied reducer function on each element of the array, resulting in a single output value."
  },
  {
    question: "What is strict mode in JavaScript ('use strict')?",
    answer: "Strict mode enforces stricter parsing and error handling in your code, preventing silent errors and bad coding practices."
  },
  {
    question: "What is localStorage?",
    answer: "localStorage is a web storage API that allows storing key-value pairs in the browser with no expiration time."
  },
  {
    question: "What is a callback function?",
    answer: "A callback function is a function passed as an argument into another function, which is then invoked inside the outer function to complete an action."
  }
];

// App State
let currentIndex = 0;
let isFlipped = false;

// DOM Elements
const cardWrapper = document.getElementById('cardWrapper');
const questionText = document.getElementById('questionText');
const answerText = document.getElementById('answerText');
const flipBtn = document.getElementById('flipBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const progressPercentage = document.getElementById('progressPercentage');
const progressCounter = document.getElementById('progressCounter');

// Functions
function updateUI() {
  const currentCard = flashcardsData[currentIndex];
  const total = flashcardsData.length;
  const currentNum = currentIndex + 1;
  const percentage = Math.round((currentNum / total) * 100);

  // Set card content
  questionText.textContent = currentCard.question;
  answerText.textContent = currentCard.answer;

  // Reset flip state when navigating
  if (isFlipped) {
    isFlipped = false;
    cardWrapper.classList.remove('flipped');
  }

  // Update progress bar & labels
  progressFill.style.width = `${percentage}%`;
  progressPercentage.textContent = `${percentage}%`;
  progressCounter.textContent = `${currentNum} of ${total}`;

  // Update button text and disabled states
  flipBtn.textContent = 'Show Answer';
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === total - 1;
}

function toggleFlip() {
  isFlipped = !isFlipped;
  cardWrapper.classList.toggle('flipped', isFlipped);
  flipBtn.textContent = isFlipped ? 'Show Question' : 'Show Answer';
}

function goToPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    updateUI();
  }
}

function goToNext() {
  if (currentIndex < flashcardsData.length - 1) {
    currentIndex++;
    updateUI();
  }
}

// Event Listeners
cardWrapper.addEventListener('click', toggleFlip);
flipBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleFlip();
});

prevBtn.addEventListener('click', goToPrev);
nextBtn.addEventListener('click', goToNext);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    goToPrev();
  } else if (e.key === 'ArrowRight') {
    goToNext();
  } else if (e.key === ' ' || e.key === 'Enter') {
    toggleFlip();
  }
});

// Initial Render
updateUI();