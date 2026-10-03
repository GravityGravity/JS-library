
// QUERIES

const table_body = document.querySelector('tbody');
const updateBtn = document.querySelector('.update') 

// GLOBALS
const myLibrary = [];

function Book(title, year, author) {
    if(!new.target) {
        throw Error("New not called for construct f Book()")
    }

    this.title = title,
    this.year = year,
    this.author = author,
    this.id = 'B-' + crypto.randomUUID()
}

function addBookToLib(title, year, author) {
    let book = new Book(title, year, author);
    myLibrary.push(book);
}

function renderLibrary () {
    table_body.replaceChildren();
    for(let book of myLibrary) {
        let t_row = table_body.insertRow(-1);
        t_row.classList.add(book.id);

        for (let key in book) {
            let cell = t_row.insertCell(-1);
            cell.textContent = book[key];
        }
        let cell = t_row.insertCell(-1);
        cell.appendChild(addDelBtn(book.id));
        table_body.appendChild(t_row);
    }
}

function addDelBtn (id) {
    const newBtn = document.createElement('button');
    newBtn.type = 'button';
    newBtn.textContent = 'Delete';
    newBtn.addEventListener('click', e => {
        const rmRow = table_body.querySelector(`.${id}`);
        rmRow.remove();
    });

    return newBtn;
}

function addReadBtn (id) {
    const newBtn = document.createElement('button');
    newBtn.type = 'button';
    newBtn.textContent = 'Read';
    newBtn.addEventListener('click', e => {
        e.currentTarget.classList.toggle(isRead)
        rmRow.remove();
    });

// EVENTS

updateBtn.addEventListener('click', () => {
    renderLibrary();
})

//DEBUG

addBookToLib('Book1', 1990, 'Jane Doe 1');
addBookToLib('Book1', 1990, 'Jane Doe 1');
addBookToLib('Book1', 1990, 'Jane Doe 1');
addBookToLib('Book1', 1990, 'Jane Doe 1');
addBookToLib('Book1', 1990, 'Jane Doe 1');