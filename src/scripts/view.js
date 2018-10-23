const generate = count => Array.from(Array(count).keys());

const playgroundTemplate = ({onClickHandler, colCount, rowsCount}) => ({
    name: 'table',
    children: generate(rowsCount).map(row => ({
        name: 'tr',
        children: generate(colCount).map(col => ({
            name: 'td',
            className: 'scene',
            children: {
                name: 'div',
                className: 'card',
                id: row * rowsCount + col,
                onClick: onClickHandler,
                children: [
                    {
                        name: 'div',
                        className: 'card__face card__face-front',
                    },
                    {
                        name: 'div',
                        className: 'card__face card__face-back',
                    }
                ]
            }
        }))
    }))
});

export default playgroundTemplate;
