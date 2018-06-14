/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube',
             'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-leaf',
             'fa-bomb', 'fa-bolt',   'fa-bicycle', 'fa-paper-plane-o', 'fa-cube','fa-diamond'];
let numMoves = 0;
let openCards = [];
let matches = 0;
/*
  * Display the cards on the page
  *   - shuffle the list of cards using the provided "shuffle" method below
  *   - loop through each card and create its HTML
  *   - add each card's HTML to the page
*/


document.querySelector('.restart').addEventListener('click',function(e) {
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
  document.querySelector('.moves').textContent = numMoves;
}

function endOfGame() {
  setTimeout(function() {
    if (matches === 8) {
      alert('FIN!!!')
    }
  })
}

function lockCards(callback) {
  for (let item of document.getElementsByClassName(openCards[0])) {
    item.parentNode.classList.remove('show');
    item.parentNode.classList.remove('open');
    item.parentNode.classList.toggle('match');
  }
  matches += 1;
  endOfGame()
}

function hideCard(openCards) {
  setTimeout(function () {
    for (let i = 0; i < openCards.length; i++) {
      for (let item of document.getElementsByClassName(openCards[i])) {
        item.parentNode.classList.remove('show');
        item.parentNode.classList.remove('open');
      }
    }
  }.bind(this), 800);
}

function incrementMove() {
  numMoves += 1;
  openCards = [];
  document.querySelector('.moves').textContent = numMoves;
}

function checkMatch() {
  if (openCards[0] === openCards[1]) {
    lockCards(openCards[0] );
  }else{
    hideCard(openCards)
  }
  incrementMove();
}

function appendInArray(element) {
  openCards.push(element);
  if(openCards.length === 2) {
    checkMatch();
  }
}

function showCard(cardElmt)  {
  cardElmt.classList.add('open');
  cardElmt.classList.add('show');
  appendInArray(cardElmt.children[0].className)
}

document.querySelector('.deck').addEventListener('click',function(e) {
  let cardElmt = e.target;
  if (e.target.nodeName === 'LI' && !cardElmt.classList.contains('match') && !cardElmt.classList.contains('open')){
    showCard(cardElmt);
  }
});

document.addEventListener("DOMContentLoaded", restart());
/*
 * set up the event listener for a card. If a card is clicked:
 *  - DONE display the card's symbol (put this functionality in another function that you call from this one)
 *  - DONE add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + DONE if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + DONE if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + DONE increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
