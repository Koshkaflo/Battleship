/*
1 variant (simple version)
var randomLoc = Math.floor(Math.random() * 5);
var location1 = randomLoc;
var location2 = location1 + 1;
var location3 = location2 + 1;

var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

while (isSunk == false) {
    guess = prompt('Ready, aim, fire! (enter a number 0-6):');

    if (guess < 0 || guess > 6) {
        alert('Please enter a valid cell number');
    } else {
        guesses = guesses + 1;

        if (guess == location1 || guess == location2 || guess == location3) {
            alert('HIT!');
            hits = hits + 1;
            if (hits == 3) {
                isSunk = true;
                alert('You sank my battleship');
            }
        } else {
            alert('MISS')
        }
    }
}
var stats = 'you took ' + guesses + ' guesses to sink the battleship, ' + 'which means your shooting accuracy was ' + (3/guesses);
alert(stats);
*/



//2 variant (full version)

let view = {
    displayMessage: function(msg) {
        let messageArea = document.getElementById('messageArea');
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'hit');
    },
    displayMiss: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute('class', 'miss');
    }
};



//test
/*
view.displayMiss('00');
view.displayHit('34');
view.displayMiss('55');
view.displayHit('12');
view.displayMiss('25');
view.displayHit('26');

view.displayMessage('Tap tap, is this thing on?');
*/


let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipSunk: 0,

    ships: [
        {locations: ['06', '16', '26'], hits: ['', '', '']},
        {locations: ['24', '34', '44'], hits: ['', '', '']},
        {locations: ['10', '11', '12'], hits: ['', '', '']}],
    
    fire: function(guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayMessage('HIT!');
                if (this.isSunk(ship)) {
                    view.displayMessage('You sank my battleship!');
                    this.shipSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage('You missed.')
        return false;
    },

    isSunk: function(ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    }
};

//test
/*
model.fire('53');

model.fire('06');
model.fire('16');
model.fire('26');

model.fire('34');
model.fire('24');
model.fire('44');

model.fire('11');
model.fire('12');
model.fire('10');
*/



