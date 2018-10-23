import '../styles/index.scss';
import playgroundTemplate from './view';
import render from './render';
import Controller from './controller';

const colCount = 4;
const rowsCount = 4;
const root = document.getElementById('app-root');

const game = new Controller({
    colCount,
    rowsCount,
});

const template = playgroundTemplate({
    colCount,
    rowsCount,
    onClickHandler: game.onClickHandler,
});

render(template, root);

game.showAllCards();
