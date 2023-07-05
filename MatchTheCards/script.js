(() => {
    const cards = {
        c01: {
            id: "c01",
            className: "",
            opened: false,
            correct: false
        },
        c02: {
            id: "c02",
            className: "",
            opened: false,
            correct: false
        },
        c03: {
            id: "c03",
            className: "",
            opened: false,
            correct: false
        },
        c04: {
            id: "c04",
            className: "",
            opened: false,
            correct: false
        },
        c05: {
            id: "c05",
            className: "",
            opened: false,
            correct: false
        },
        c06: {
            id: "c06",
            className: "",
            opened: false,
            correct: false
        },
        c07: {
            id: "c07",
            className: "",
            opened: false,
            correct: false
        },
        c08: {
            id: "c08",
            className: "",
            opened: false,
            correct: false
        },
        c09: {
            id: "c09",
            className: "",
            opened: false,
            correct: false
        },
        c10: {
            id: "c10",
            className: "",
            opened: false,
            correct: false
        },
        c11: {
            id: "c11",
            className: "",
            opened: false,
            correct: false
        },
        c12: {
            id: "c12",
            className: "",
            opened: false,
            correct: false
        },
        c13: {
            id: "c13",
            className: "",
            opened: false,
            correct: false
        },
        c14: {
            id: "c14",
            className: "",
            opened: false,
            correct: false
        },
        c15: {
            id: "c15",
            className: "",
            opened: false,
            correct: false
        },
        c16: {
            id: "c16",
            className: "",
            opened: false,
            correct: false
        },
        c17: {
            id: "c17",
            className: "",
            opened: false,
            correct: false
        },
        c18: {
            id: "c18",
            className: "",
            opened: false,
            correct: false
        },
        c19: {
            id: "c19",
            className: "",
            opened: false,
            correct: false
        },
        c20: {
            id: "c20",
            className: "",
            opened: false,
            correct: false
        },
        c21: {
            id: "c21",
            className: "",
            opened: false,
            correct: false
        },
        c22: {
            id: "c22",
            className: "",
            opened: false,
            correct: false
        },
        c23: {
            id: "c23",
            className: "",
            opened: false,
            correct: false
        },
        c24: {
            id: "c24",
            className: "",
            opened: false,
            correct: false
        },
    }
    
    const classList = [ "Warrior", "Spellblade", "Reaper",
                        "Archer", "Deadeye", "Hunter",
                        "Mage", "Dreadlord", "Necromancer",
                        "Assassin", "Bladedancer", "Shinobi",
                        "Shielder", "Warlord", "Guardian"];

    const gameBoard = document.querySelector(".game-board");

    const barrier = document.querySelector(".barrier");

    const turns = document.getElementById("turnNo");
    const pts = document.getElementById("pts");

    function resetCards() {
        for (const card in cards) {
            cards[card].className = "";
            cards[card].opened = false;
        }
    }

    function setupCards() {
        // choose 12 classes from 15 classes
        const selectedClasses = classList.sort(() => Math.random() - 0.5).slice(0, 12);

        const classNames = [...selectedClasses, ...selectedClasses];
        const classNameShuffled = classNames.sort(() => Math.random() - 0.5);
        let i = 0;

        for (const card in cards){
            cards[card].className = classNameShuffled[i]
            i++;
        }
    }

    function fillBoard() {

        resetCards();
        setupCards();

        gameBoard.innerHTML = ""

        let k = 1;
        for (let i = 0; i < 4; i++) {
            let gameRow = `<div class="game-board-row">`;
            for (let j = 0; j < 6; j ++) {
                // get className from current card sequence
                const cardKey = `c${k.toString().padStart(2, "0")}`;

                let card = `
                    <div class="card">
                        <div class="card-inner" id="${cardKey}">
                            <div class="card-front">
                                <img src="./RPGclassIcons/unknown.svg">
                            </div>
                            <div class="card-content">
                                <img src="./RPGclassIcons/unknown.svg">
                            </div>
                        </div>
                    </div>
                `

                gameRow += card;
                k++;
            }
            gameRow += `</div>`;
            gameBoard.innerHTML += gameRow
        }

        addCardListeners();
    }

    function addCardListeners() {
        const cardElements = document.querySelectorAll(".card");
        cardElements.forEach((card) => {
            const cardInner = card.querySelector(".card-inner");
            card.addEventListener("click", () => {
                flipCard(cardInner);
            });
        });
    }

    // game state control
    let selectedCards = [];
    let turn = 0;
    let score = 0;

    function flipCard(cardElement) {
        const card = cards[cardElement.id];

        if (!card.opened && !card.correct) {
            const backCard = cardElement.querySelector(".card-content");
            backCard.innerHTML = `<img src="./RPGclassIcons/${cards[cardElement.id].className}.svg">`
            cardElement.classList.add("open");
            card.opened = true;
            assignSelection(cards[cardElement.id]);
        }
    }

    function assignSelection(cardId) {
        selectedCards.push(cardId)
        if (selectedCards.length === 2) {
            barrier.style.display = "block";
            setTimeout(() => {
                checkSelectedCards()
                selectedCards = []
                barrier.style.display = "none"
            }, 1000);          
        }
    }

    function checkSelectedCards() {
        const cardDiv1 = document.getElementById(`${selectedCards[0].id}`);
        const cardDiv2 = document.getElementById(`${selectedCards[1].id}`);
   
        if (selectedCards[0].className === selectedCards[1].className) {
            cards[selectedCards[0].id].correct = true;
            cards[selectedCards[1].id].correct = true;
    
            cardDiv1.classList.add("corrected");
            cardDiv2.classList.add("corrected");
            cardDiv1.removeEventListener("click", flipCard);
            cardDiv2.removeEventListener("click", flipCard);
            score ++;
            pts.innerHTML = score;
        }
        cardDiv1.classList.remove("open");
        cardDiv2.classList.remove("open");
        cards[selectedCards[0].id].opened = false;
        cards[selectedCards[1].id].opened = false;
        turn ++;
        turns.innerHTML = turn;
    }

    function run() {
        fillBoard();
    }
    run();
})();