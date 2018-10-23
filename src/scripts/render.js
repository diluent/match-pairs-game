const castToArray = item => Array.isArray(item) ? item : (item ? [item] : []);

const render = (template, root) => {
    const items = Array.isArray(template) ? template : [template];
    const domTree = renderItem(template);
    root.appendChild(domTree);
}

const renderItem = item => {
    invariant(() => item.name, "Property 'name' can't be empty or undefined");

    const elem = createElement({
        name: item.name,
        className: item.className,
        id: item.id,
        attr: castToArray(item.attr),
        onClick: item.onClick,
    });

    return addChildren(elem, item.children);
}

const createElement = ({name, className, id, attr, onClick}) => {
    const elem = document.createElement(name);
    if (className) {
        elem.className = className;
    }

    if (id !== null && id !== undefined) {
        elem.setAttribute('id', id);
    }

    attr.forEach(_attr => elem.setAttribute(_attr.name, _attr.value));

    if (typeof onClick === 'function') {
        elem.addEventListener('click', onClick);
    }

    return elem;
}

const addChildren = (elem, children) => {
    const items = castToArray(children);

    items.forEach(child => {
        let i = child.repeat || 1;

        while (i-- > 0) {
            const item = renderItem(child);
            elem.appendChild(item, null);
        }
    });

    return elem;
}

const invariant = (condition, text) => {
    if (!condition()) {
        throw Error(text);
    }
}

export default render;
