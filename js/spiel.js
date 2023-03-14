window.addEventListener('load', function () {
    // Benutzername abfragen und anzeigen
    var username = prompt('Wie ist dein Name?');
    var playerNameElement = document.getElementById('player-name');
    playerNameElement.innerText = username;

    // Spielzeit anzeigen und zählen
    var timeElement = document.getElementById('time-count');
    var seconds = 0;
    var timer = setInterval(function () {
        seconds++;
        timeElement.innerText = seconds + ' Sekunden';
    }, 1000);

    // Versuche zählen und anzeigen
    var attemptsElement = document.getElementById('tries-count');
    var attempts = 0;

    var cardsContainer = document.getElementById('spielbereich');
    var cards = [];
    var cardIds = [];

    // Create array of card IDs
    for (var i = 1; i <= 16; i++) {
        cardIds.push(i);
    }

    // Shuffle the array of card IDs
    for (var i = cardIds.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cardIds[i];
        cardIds[i] = cardIds[j];
        cardIds[j] = temp;
    }

    // Create cards with shuffled IDs
    for (var i = 0; i < 16; i++) {
        // Create new card element
        var card = document.createElement('img');
        card.src = 'pics/memoryBg.png';
        card.classList.add('card');
        card.setAttribute('data-card-id', cardIds[i]);
        card.addEventListener('click', function () {
            if (cards.length < 2 && !this.classList.contains('solved')) {
                // Show clicked card
                this.src = 'pics/card' + this.getAttribute('data-card-id') + '.png';
                cards.push(this);

                // If two cards are clicked
                if (cards.length == 2) {
                    // Disable clicking until cards are checked
                    cardsContainer.classList.add('disabled');

                    attempts++;
                    attemptsElement.innerText = attempts;

                    // Check if cards match
                    var sum = parseInt(cards[0].getAttribute('data-card-id')) + parseInt(cards[1].getAttribute('data-card-id'));
                    if (sum % 17 == 0) {
                        setTimeout(function () {
                            // Mark cards as solved and disable clicking
                            cards[0].src = 'pics/memoryBgI.png';
                            cards[0].classList.add('solved');
                            cards[1].src = 'pics/memoryBgI.png';
                            cards[1].classList.add('solved');
                            cardsContainer.classList.remove('disabled');
                            cards = [];
                        }, 2000);
                    } else {
                        // Show cards for 2 seconds before hiding again
                        setTimeout(function () {
                            cards[0].src = 'pics/memoryBg.png';
                            cards[1].src = 'pics/memoryBg.png';
                            cardsContainer.classList.remove('disabled');
                            cards = [];
                        }, 2000);
                    }
                }
            }
        });

        // Add card to container
        cardsContainer.appendChild(card);
    }
});