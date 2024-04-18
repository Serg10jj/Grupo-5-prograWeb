import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Toolbar  
} from "@mui/material";

const Libros = () => {
  const [libros, setLibros] = useState([]);
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();

  const fetchLibros = async () => {
    try {
      const response = await axios.get("http://localhost:3008/libros", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
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

  const handleBack = () => {
    navigate('/home'); // o la ruta que corresponda
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <nav>
            <a href="/perfil">Perfil</a>
            &nbsp; &nbsp;
            <a href="/consulta">Consulta</a>
            &nbsp; &nbsp;
            <a href="/registroLibro">Registro de Libros</a>
         </nav>
         <br />
         <br />
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
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLibros.map((libro) => (
              <TableRow key={libro.libro_id}>
                <TableCell>{libro.nombre_libro}</TableCell>
                <TableCell>{libro.nombre_autor}</TableCell>
                <TableCell>
                  {/* Aquí irían tus botones de editar y eliminar */}
                  <Button color="primary">Editar</Button>
                  <Button color="secondary">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
        <Button onClick={handleBack} variant="contained">
          Volver
        </Button>
        <Button onClick={fetchLibros} variant="contained" color="primary">
          Refrescar
        </Button>
      </Grid>
    </Box>
  );
};

export default Libros;