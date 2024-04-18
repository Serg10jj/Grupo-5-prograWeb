import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./registroLibro.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReservaLibro = () => {
  const [nombreLibro, setNombreLibro] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3008/reservaLibro", {
        nombre_libro: nombreLibro,
        nombre_usuario: nombreUsuario,

      });
      console.log(response.data);
      // Reset input fields after successful registration
      alert("Libro Reservado con Exito");
      localStorage.setItem("Reserva", JSON.stringify(response.data.NuevoApartado));
      //navigate("/");
      setNombreLibro("");
      setNombreUsuario("");
    } catch (error) {
      console.error("Error Reserva Libro:", error);
    }
  };
  return (
    <div className={styles.RegistroLibro} data-testid="ReservaLibro">
      <Card sx={{ maxWidth: 430,
      maxHeight: 400, 
      mx: "auto", 
      mt: 5, 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh'}}>
        <CardContent>
          <h1>Reserva de Libros</h1>
          <TextField
            id="outlined-basic"
            onChange={(e) => {
              setNombreLibro(e.target.value);
            }}
            label="Nombre del Libro"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            onChange={(e) => {
              setNombreAutor(e.target.value);
            }}
            label="Autor"
            variant="outlined"
          />
          <br />
          <br />
            <TextField
            id="outlined-basic"
            onChange={(e) => {
              setCantidadDisponible(e.target.value);
            }}
            label="Cantidad Disponible"
            variant="outlined"
          />
          <br />
          <br /> 
          <Button onClick={handleSubmit} variant="contained" style={{backgroundColor: 'green', color: 'white'}}>
            Registro de Libro
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
ReservaLibro.propTypes = {};
ReservaLibro.defaultProps = {};
export default ReservaLibro;