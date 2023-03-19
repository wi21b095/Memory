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

    // Array von card IDs
    for (var i = 1; i <= 16; i++) {
        cardIds.push(i);
    }

    // Array der Card IDs mischen
    for (var i = cardIds.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cardIds[i];
        cardIds[i] = cardIds[j];
        cardIds[j] = temp;
    }

    // Gemischte Karten neue ID zuweisen
    for (var i = 0; i < 16; i++) {
        // Neues Karten Element
        var card = document.createElement('img');
        card.src = 'pics/memoryBg.png';
        card.classList.add('card');
        card.setAttribute('data-card-id', cardIds[i]);
        card.addEventListener('click', function () {
            if (cards.length < 2 && !this.classList.contains('solved')) {
                // Ausgewählte Karte anzeigen
                this.src = 'pics/card' + this.getAttribute('data-card-id') + '.png';
                cards.push(this);

                // Wenn 2 Karten ausgewählt wurden
                if (cards.length == 2) {
                    // Neuauswahl disabled bis Karten gecheckt wurden
                    cardsContainer.classList.add('disabled');

                    attempts++;
                    attemptsElement.innerText = attempts;

                    // Schauen ob Karten gleich sind
                    var sum = parseInt(cards[0].getAttribute('data-card-id')) + parseInt(cards[1].getAttribute('data-card-id'));
                    if (sum % 17 == 0) {
                        setTimeout(function () {
                            // Karten als gelöst markieren
                            cards[0].src = 'pics/memoryBgI.png';
                            cards[0].classList.add('solved');
                            cards[1].src = 'pics/memoryBgI.png';
                            cards[1].classList.add('solved');
                            cardsContainer.classList.remove('disabled');
                            cards = [];
                        }, 1000);
                    } else {
                        // Karten werden gezeigt, bevor sie umgedreht werden
                        setTimeout(function () {
                            cards[0].src = 'pics/memoryBg.png';
                            cards[1].src = 'pics/memoryBg.png';
                            cardsContainer.classList.remove('disabled');
                            cards = [];
                        }, 1000);
                    }
                }
            }
        });

        // Karten zum Kontainer hinzufügen
        cardsContainer.appendChild(card);
    }
});