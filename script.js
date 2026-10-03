
// QUERIES

const table_body = document.querySelector('tbody');
const updateBtn = document.querySelector('.update') 

// GLOBALS
const myLibrary = [];

function Book(title, year, author, hasRead) {
    if(!new.target) {
        throw Error("New not called for construct f Book()")
    }

    this.title = title,
    this.year = year,
    this.author = author,
    this.id = 'B-' + crypto.randomUUID(),
    this.hasRead = hasRead
}

function addBookToLib(title, year, author, hasRead) {
    let book = new Book(title, year, author, hasRead);
    myLibrary.push(book);
}

function renderLibrary () {
    table_body.replaceChildren();
    for(let book of myLibrary) {
        let t_row = table_body.insertRow(-1);
        t_row.classList.add(book.id);

        for (let key in book) {
            let cell = t_row.insertCell(-1);
            cell.classList.add(key);

            if (key === 'hasRead') {
                let img = document.createElement('img');
                console.log(book[key])
                if (book[key]) {
                    img.classList.add('book-read');
                }

                cell.appendChild(img);
            } else {
                cell.textContent = book[key];
            }
        }

        // Add buttons
        let cell = t_row.insertCell(-1);
        cell.appendChild(addDelBtn(book.id));
        cell = t_row.insertCell(-1);
        cell.appendChild(addReadBtn(book.id));

        // Append Row
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
    newBtn.textContent = 'Toggle Read';
    newBtn.addEventListener('click', e => {
        const img = table_body.querySelector(`.${id} .hasRead img`);
        img.classList.toggle('book-read');
    });

    return newBtn;
}
// EVENTS

updateBtn.addEventListener('click', () => {
    renderLibrary();
})

//DEBUG


addBookToLib('Book1', 1990, 'Jane Doe 1', false);
addBookToLib('Book1', 1990, 'Jane Doe 1', true);
addBookToLib('Book1', 1990, 'Jane Doe 1', false);
addBookToLib('Book1', 1990, 'Jane Doe 1', false);
addBookToLib('Book1', 1990, 'Jane Doe 1', true);

renderLibrary();