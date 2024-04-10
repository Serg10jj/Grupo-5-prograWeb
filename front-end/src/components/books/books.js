import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./books.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Book from "../book/book";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
//import Item from "@mui/material/Grid";
const Books = () => {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();
  const fetchBooks = async () => {
    console.log("fetchBooks");
    try {
      const response = await axios.get("http://localhost:3008/books", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setBooks(response.data);
    } catch (e) {
      console.error("Error fetching users:", e);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleFilter = (e) => {
    const { value } = e.target;
    const filteredBooks = books.filter((book) => {
      return book.user_name.toLowerCase().includes(value.toLowerCase());
    });
    setUsers(filteredUsers);
  };
  return (
    <div className={styles.Users} data-testid="Books">
      Libros Registrados: &nbsp;
      {books.length}
      <Grid container>
        <Grid spacing={2} item xs={12}>
          <TextField
            id="outlined-basic"
            onChange={handleFilter}
            label="Outlined"
            variant="outlined"
          />
        </Grid>
        <hr />
      </Grid>
      <Grid container>
        {books.map((book, index) => (
          <Grid item xs={12} md={6} lg={4}>
            <User user={book} refreshData={fetchUsers} />
          </Grid>
        ))}

        {books.forEach((books) => {
          console.log("Book: forEach", book);
        })}
      </Grid>
      <ul></ul>
    </div>
  );
};

Users.propTypes = {};

Users.defaultProps = {};

export default Books;
