/*
 * List that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-diamond',
             'fa-paper-plane-o', 'fa-paper-plane-o',
             'fa-anchor', 'fa-anchor',
             'fa-bolt', 'fa-bolt',
             'fa-leaf', 'fa-leaf',
             'fa-bomb', 'fa-bomb',
             'fa-bicycle', 'fa-bicycle',
             'fa-cube', 'fa-cube'];

// Global variables
let numMoves = 0;
let openCards = [];
let matches = 0;
let stars = 3;

// Function to restart the game on click in restart bottom
document.querySelector('.restart').addEventListener('click', function(e) {
  restart();
  e.preventDefault();
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Function to restartthe game
function restart() {
  let cards_shuffled = shuffle(cards);
  let deck = document.querySelector('.deck');
  deck.innerHTML = '';
  for(let i = 0; i < cards_shuffled.length; i++) {
    let item = document.createElement("li");
    item.classList.add('card')
    let card = document.createElement('i')
    card.classList.add('fa');
    card.classList.add(cards_shuffled[i]);
    item.appendChild(card);
    deck.appendChild(item);
  }
  numMoves = 0;
  openCards = [];
  matches = 0;
  stars = 3;
  document.querySelector('#star3').classList.remove('nostart');
  document.querySelector('#star2').classList.remove('nostart');
  document.querySelector('.moves').textContent = numMoves;
  document.querySelector('.circle-loader').classList.remove('load-complete');
  document.querySelector('.checkmark').style.display = 'none';
  document.querySelector('.checkmark').innerHTML = ''
  document.getElementById('end').classList.add('hidden');
  // $('.circle-loader').toggleClass('load-complete');
  // $('.checkmark').toggle();
}

// Function to end the game
function endOfGame() {
  setTimeout(function() {
    document.getElementById('end').classList.remove('hidden')
    document.getElementById('score').textContent = 'With ' + numMoves + ' moves and ' + stars + ' stars.'
    $('.circle-loader').toggleClass('load-complete');
    $('.checkmark').toggle();
  },1000);
}

// Function to lock paired cards
function lockCards(openCard) {
  setTimeout(function () {
    for (let item of document.getElementsByClassName(openCard)) {
      console.log(item)
      item.parentNode.classList.remove('show');
      item.parentNode.classList.remove('open');
      item.parentNode.classList.toggle('match');
    }
    matches += 1;
    // Check if the game is over
    if (matches === 8) {
      endOfGame()
    }
  }.bind(this),1000);
}

// Function to hide cards that don't match
function hideCard(openCards) {
  setTimeout(function () {
    for (let i = 0; i < openCards.length; i++) {
      for (let item of document.getElementsByClassName(openCards[i])) {
        item.parentNode.classList.remove('show');
        item.parentNode.classList.remove('open');
      }
    }
  }.bind(this),1100);
}

// Function to increment movement counter
function incrementMove() {
  numMoves += 1;
  openCards = [];
  // Star managment
  if (numMoves > 12) {
    stars = 2;
    document.querySelector('#star3').classList.add('nostart');
  }
  if (numMoves > 24 ) {
    stars = 1;
    document.querySelector('#star3').classList.add('nostart');
    document.querySelector('#star2').classList.add('nostart');
  }
  // Update number of movements
  document.querySelector('.moves').textContent = numMoves;
}

// Function to check if cards match
function checkMatch() {
  if (openCards[0] === openCards[1]) {
    lockCards(openCards[0] );
  } else {
    hideCard(openCards)
  }
  // Increment movement counter
  incrementMove();
}

// Function to add the card to a *list* of "open" cards
function appendInArray(element) {
  openCards.push(element);
  if(openCards.length === 2) {
    // Check if cards match
    checkMatch();
  }
}

// Function to display the card's symbol
function showCard(cardElmt) {
  cardElmt.classList.add('open');
  cardElmt.classList.add('show');
  // Add the card to a *list* of "open" cards
  appendInArray(cardElmt.children[0].className)
}

// Set up the event listener for a card
document.querySelector('.deck').addEventListener('click',function(e) {
  let cardElmt = e.target;
  if (e.target.nodeName === 'LI' && !cardElmt.classList.contains('match') && !cardElmt.classList.contains('open')) {
    showCard(cardElmt);
  }
});

// Restart when click on play again button
document.querySelector('#restartButton').addEventListener('click', restart );

// Shuffle cards when load
document.addEventListener( "DOMContentLoaded", restart() );
