import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form"; //TextArea,

function Favorites() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [headIntro, setheadIntro] = useState("Here's your favroites!");
  const [searchTerm, setsearchTerm] = useState("random");

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBookDB()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
    console.log(books);
  
  }

  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

 

  return (
    <Container main>
      <Row>
        <Col size="12">
          <Jumbotron>
            <h1>{headIntro}</h1>
           
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map((book) => (
                <ListItem key={book.id}>
                  <DeleteBtn onClick={() => deleteBook(book._id)} />
                  <a href={book.link}>
                      <img src={book.img}></img> 
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                  </a>
                  <p>
                    {book.desc}
                    </p>
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

export default Favorites;
