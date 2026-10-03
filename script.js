const myLibrary = [];

function Book(title, year, author) {
    if(!new.target) {
        throw Error("New not called for construct f Book()")
    }

    this.title = title,
    this.year = year,
    this.author = author,
    this.id = crypto.randomUUID();
}

function addBookToLib(title, year, author) {
    let book = new Book(title, year, author);
    myLibrary.push(book);
}

function showLibrary () {
    for(let book of myLibrary) {
        console.log(`${book.title} ${book.year} ${book.author} ${book.id}`);
    }

    return null;
}