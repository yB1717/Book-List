class Book{
    constructor(title , author , isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    addBookToList(book){
    const tableRow = document.querySelector('tbody').appendChild(document.createElement('tr')),
        title = tableRow.appendChild(document.createElement('td')),
        author = tableRow.appendChild(document.createElement('td')),
        isbn = tableRow.appendChild(document.createElement('td')),
        deleteCol = tableRow.appendChild(document.createElement('td'));


    title.appendChild(document.createTextNode(book.title));
    author.appendChild(document.createTextNode(book.author));
    isbn.appendChild(document.createTextNode(book.isbn));
    deleteCol.appendChild(document.createElement('a'));

    const deleteIcon = deleteCol.children[0];
    deleteIcon.href = "#";
    deleteIcon.className = 'delete';
    deleteIcon.appendChild(document.createTextNode('X'));

    }

    clearInputFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    deleteBook(e){
        confirm('Are U Sure?');
        e.target.parentElement.parentElement.remove();
    }

    showAlert(message , className){
        const msg = document.createElement('div');
        msg.appendChild(document.createTextNode(message));
        msg.className = `alert ${className}`;

        const form = document.getElementById('book-form');
        document.querySelector('.container').insertBefore(msg , form);
        setTimeout(function(){
          msg.remove()
        },3000);
    }
}

class Store {
    static getBooks(){
        let books

        if(localStorage.getItem('books') === null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books
    }

    static addBook(book){
        let books = this.getBooks()

        books.push(book)

        localStorage.setItem('books' , JSON.stringify(books))


    }

    static displayBooks(){
        const ui = new UI()
        const books = this.getBooks()

        books.forEach(function(book){
            ui.addBookToList(book)
        })
    }

    static removeBook(isbn){

        const books = this.getBooks();

        books.forEach(function(book , index){
            if(book.isbn === isbn){
                books.splice(index , 1)
            }
        })

        localStorage.setItem('books' , JSON.stringify(books))
    }
}

document.addEventListener('DOMContentLoaded' , Store.displayBooks())

document.getElementById('submit').addEventListener('click',function(e){

    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
         

    //INSTANTIATE THE BOOK OBJECT
    const book = new Book(title,author,isbn);
    //INSTANTIATE UI OBJECT
    const ui = new UI();

    if(title === '' || author === '' || isbn === ''){
        //BOOK CANNOT BE ADDED
        ui.showAlert('Please Fill All The Fields','error');

    }else{
        //ADD BOOK TO THE LIST
        ui.addBookToList(book);
        //ADD BOOK TO LS
        Store.addBook(book);
        //CLEAR THE INPUT FIELDS
        ui.clearInputFields();
        //BOOK ADDED
        ui.showAlert('Book Added' , 'success');
    }

    e.preventDefault();
});

document.querySelector('.container').addEventListener('click' , function(e){

    const ui = new UI();

    if(e.target.className === 'delete'){
        ui.deleteBook(e);
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        ui.showAlert('Book Removed' , 'success');
    }

    e.preventDefault();
})
