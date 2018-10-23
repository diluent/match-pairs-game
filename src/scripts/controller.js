const SHOW_CARD_DELAY = 1000;
const SHOW_ALL_CARDS_DELAY = 5000;
const buildUrl = imgCode => `http://localhost:8111/svg/${imgCode}/100`;

export default class Controller {
    constructor({colCount, rowsCount}) {
        this.colCount = colCount;
        this.rowsCount = rowsCount;
        this.openCards = {};
        this.openPictures = {};
        this.openImages = {};
        this.onClickHandler = this.onClickHandler.bind(this);
        this.lastCardIndex = null;
        this.clicksLocked = false;
        this.score = 0;
        this.cards = this.init(colCount, rowsCount);
        this.shuffle(this.cards);
    }

    onClickHandler(event) {
        if (this.clicksLocked) {
            return;
        }

        const currentIndex = event.target.parentElement.id;
        const imgCode = this.cards[currentIndex];

        if (this.openCards[currentIndex] || this.openImages[imgCode]) {
            return;
        } else {
            this.showCard(currentIndex);
        }

        if (!this.lastCardIndex || this.openCards[this.lastCardIndex]) {
            this.lastCardIndex = currentIndex;
            return;
        }

        if (this.lastCardIndex === currentIndex) {
            return;
        }

        if (this.cards[this.lastCardIndex] === this.cards[currentIndex]) {
            this.openCards[currentIndex] = true;
            this.openImages[imgCode] = true;
            this.riseScore();
        } else {
            const last = this.lastCardIndex;
            setTimeout(() => {
                this.hideCard(currentIndex);
                this.hideCard(last);
            }, SHOW_CARD_DELAY);
        }

        this.lastCardIndex = null;
    }

    riseScore() {
        const elem = document.getElementById('score');
        elem.innerHTML = ++this.score;
    }

    showCard(id) {
        const imgCode = this.cards[id];
        const elem = document.getElementById(id);
        const cardBack = elem.querySelector('.card__face-back');
        cardBack.setAttribute('style', `background: url(${buildUrl(imgCode)});`);
        elem.classList.toggle('is-flipped');
    }

    hideCard(id) {
        const elem = document.getElementById(id);
        elem.classList.toggle('is-flipped');
        setTimeout(() => {
            const cardBack = elem.querySelector('.card__face-back');
            cardBack.setAttribute('style', '');
        }, 1000);
    }

    showAllCards(delay = SHOW_ALL_CARDS_DELAY) {
        this.clicksLocked = true;
        let shift = 0;
        const interval = 50;
        this.cards.forEach((code, index) => {
            setTimeout(() => this.showCard(index), shift++ * 50);
        });

        shift = 0;

        setTimeout(() => {
            this.cards.forEach((code, index) => {
                setTimeout(() => this.hideCard(index), shift++ * 50);
            });
            this.clicksLocked = false;
        }, delay);
    }

    init(colCount, rowsCount) {
        const cards = [];
        const count = colCount * rowsCount / 2;
        let i = 0;
        while (i < count) {
            const n = Math.floor(Math.random() * 1e5);
            cards[i] = n;
            cards[i + count] = n;
            i++;
        }

        return cards;
    }

    shuffle(cards) {
        let i = 0;
        const max = cards.length - 1;
        while (i++ < max) {
            const r = Math.floor(Math.random() * Math.floor(cards.length - i))
            const b = cards[i];
            cards[i] = cards[r];
            cards[r] = b;
        }
    }
}
