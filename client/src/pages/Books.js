import React, { useState, useEffect } from "react";
import FavBtn from "../components/FavBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form"; //TextArea,

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [headIntro, setheadIntro] = useState("Search for an Author or Book!");
  const [searchTerm, setsearchTerm] = useState("random");
  const [bookData, setBookData] = useState({
          id: "",
          title: "",
          authors:"",
          description: "",
          img:"",
          link: ""
       })
  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, [List]);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks(searchTerm)
      .then((res) => setBooks(res.data.items))
      .catch((err) => console.log(err));
    console.log(books);
  
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  function saveBook(book) {
    setBookData( { id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors[0],
      desc: book.volumeInfo.description,
      img: book.volumeInfo.imageLinks.smallThumbnail,
      link: book.volumeInfo.previewLink });
    console.log(bookData)
    API.saveBook(bookData)
  }

  // Handles updating component state when the user types into the input field

  function handleSearchSubmit(event) {
    event.preventDefault();
    setsearchTerm(event.target.search.value);
    console.log(searchTerm);
    loadBooks();
    setheadIntro("Showing Results for " + `"`+
     searchTerm + `"`);
      console.log(searchTerm)
  };


  return (
    <Container main>
      <Row>
        <Col size="12">
          <Jumbotron>
            <h1>{headIntro}</h1>
            <form onSubmit={handleSearchSubmit}>
              <Input  
                name="search"
                
                id="search"
                type="text"
                placeholder="Search Title or Author"
              ></Input>
              <FormBtn type="submit">Search</FormBtn>
            </form>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map((book) => (
                <ListItem key={book.id}>
                  <Link to={"/books/" + book.id}>
                    <strong>
                      <img src={book.volumeInfo.imageLinks.smallThumbnail}></img>
                      {book.volumeInfo.title} by {book.volumeInfo.authors}
                    </strong>
                  </Link>
                  <FavBtn onClick={() => saveBook(book)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Books;
