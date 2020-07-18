
//Params associated with a book
class Book {
    constructor(book){
        this.id = book.id;
        this.title = book.title;
        this.author = book.author;
        this.review = book.review;
        this.rating = book.rating;
    }

    // New Book Form
    static newBookForm(user_id) {
        let body = document.getElementById('container');
        let form = 
        ` <form id="new-book-form">
         <label>Book Title:</label>
         <input type="text" id="book-title"  placeholder: "Title">
         <label>Author:</label>
         <input type="text" id="book-author">
         <label>Review:</label>
         <input type="text" id="book-review">
         <label>Rate this book 1-5:</label>
         <input type="text" id="book-rating">
         <input type="submit"/>
         </form>
         `
   
        body.insertAdjacentHTML('beforeend', form)
        Book.postBook(user_id)
    }

    //POST fetch for creating a Book
    static postBook(user_id) {
        let newForm = document.getElementById('new-book-form')
        newForm.addEventListener('submit', function(e){
            e.preventDefault()
            fetch('http://localhost:3000/api/v1/books',{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify({
                    book: {
                        title: e.target.children[1].value,
                        author: e.target.children[3].value,
                        review: e.target.children[5].value,
                        rating: e.target.children[7].value,
                        user_id: user_id
                    }
                })
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error(); 
                }
                return res.json();
            })
            .then(json => {
                let newBook = new Book(json);
                console.log(newBook)
                newBook.appendBook()
            })
            .catch(error => {
                console.error('Book Class Error', error)
            })
        })
    }

    // Appends a users created books to the books-container that is hard-coded in the index.html
    appendBook() {
        let bc = document.getElementsByClassName('books-container')
        let p = document.createElement('p')
        p.setAttribute('data-id', this.id)
        p.innerHTML = `Title: ${this.title}</br>Author:${this.author}</br>Review:${this.review}</br>Rating:${this.rating}`
        bc[0].appendChild(p)
    }

}

