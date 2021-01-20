import axios from "axios";

export default {
  // Gets all books
  getBooks: function(searchTerm) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q="+searchTerm);
  },
  // Gets the book with the given id
  getBookDB: function() {
    return axios.get("/api/books");
  },
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    console.log("inapi")
    console.log(bookData)
    return axios.post("/api/books", bookData).then(result => result.data);;
  }
};
