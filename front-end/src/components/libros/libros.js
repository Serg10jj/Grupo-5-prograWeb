import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./libros.module.css";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  AppBar,
  Toolbar,  
  Card
} from "@mui/material";
import Navbar from "../Navbar/Navbar";

const Libros = () => {
  const [libros, setLibros] = useState([]);
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();

  const fetchLibros = async () => {
    try {
      const response = await axios.get("http://localhost:3008/libros", {

      });
      setLibros(response.data);
    } catch (e) {
      console.error("Error fetching libros:", e);
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  const handleFilter = (e) => {
    setFiltro(e.target.value);
  };

  const filteredLibros = libros.filter((libro) =>
    libro.nombre_libro.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className={styles.Libros} data-testid="Libros">
      <Navbar />
      <Card>
    <Box sx={{ marginTop: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="search"
            label="Filtro por Nombre"
            variant="outlined"
            onChange={handleFilter}
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Cantida Disponible</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLibros.map((libro) => (
              <TableRow key={libro.libro_id}>
                <TableCell>{libro.nombre_libro}</TableCell>
                <TableCell>{libro.nombre_autor}</TableCell>
                <TableCell>{libro.cantidad_disponible}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/libros/${libro.libro_id}`)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Card>
    </div>
  );
};

export default Libros;