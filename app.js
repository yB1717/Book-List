function Book(title , author , isbn){
    this.title = title
    this.author = author
    this.isbn = isbn
}

function UI(){}

UI.prototype.addBookToList = function(book){
    const tableRow = document.querySelector('tbody').appendChild(document.createElement('tr')),
          title = tableRow.appendChild(document.createElement('td')),
          author = tableRow.appendChild(document.createElement('td')),
          isbn = tableRow.appendChild(document.createElement('td')),
          deleteCol = tableRow.appendChild(document.createElement('td'))


    title.appendChild(document.createTextNode(book.title))
    author.appendChild(document.createTextNode(book.author))
    isbn.appendChild(document.createTextNode(book.isbn))
    deleteCol.appendChild(document.createElement('a'))

    const deleteIcon = deleteCol.children[0]
    deleteIcon.href = "#"
    deleteIcon.className = 'delete'
    deleteIcon.appendChild(document.createTextNode('X'))

    
}
UI.prototype.clearInputFields = function(){
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
}
UI.prototype.deleteBook = function(e){
        confirm('Are U Sure?')
        e.target.parentElement.parentElement.remove();
        
}


UI.prototype.showAlert = function(message , className){

    const msg = document.createElement('div')
    msg.appendChild(document.createTextNode(message))
    msg.className = className

    const form = document.getElementById('book-form')
    document.querySelector('.container').insertBefore(msg , form)
    setTimeout(function(){
       msg.remove()
    },3000)
}

document.getElementById('book-form').addEventListener('submit',function(e){
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
         

    //INSTANTIATE THE BOOK OBJECT
    const book = new Book(title,author,isbn)
    //INSTANTIATE UI OBJECT
    const ui = new UI()

    if(title === '' || author === '' || isbn === ''){
        //BOOK CANNOT BE ADDED
        ui.showAlert('Please Fill All The Fields','error')

    }else{
        //ADD BOOK TO THE LIST
        ui.addBookToList(book)
        //CLEAR THE INPUT FIELDS
        ui.clearInputFields()
        //BOOK ADDED
        ui.showAlert('Book Added' , 'success')
    }

    e.preventDefault()
})

document.querySelector('.container').addEventListener('click' , function(e){

    const ui = new UI()

    if(e.target.className === 'delete'){
        ui.deleteBook(e)
        ui.showAlert('Book Removed' , 'success')
    }
})