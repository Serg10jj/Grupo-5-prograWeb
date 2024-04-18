import React from "react";
import PropTypes from "prop-types";

//imports MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const navigate = useNavigate(); // Hook para la navegación
  // Simula la carga de datos de usuario
  const userData = JSON.parse(localStorage.getItem("user"));

  // Si no hay datos de usuario, muestra un mensaje o redirige
  if (!userData) {
    return <p>No hay datos de usuario disponibles</p>;
  }

  const handleBack = () => {
   navigate('/libros');
 };


  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <nav>
            <a href="/perfil">Perfil</a>
            &nbsp; &nbsp;
            <a href="/consulta">Consulta</a>
            &nbsp; &nbsp;
            <a href="/registroLibro">Registro de Libros</a>
         </nav>
         <br />
         <br />
      <CardContent>
        <Typography variant="h5" component="div">
          Perfil de Usuario
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}> {/* Centra el Avatar */}
          <Avatar sx={{ width: 56, height: 56 }}>U</Avatar>
        </Box>
        <Typography color="text.secondary" gutterBottom>
          Nombre: {userData.user_name}
        </Typography>
        <Typography color="text.secondary">
          Apellido: {userData.user_last_name}
        </Typography>
        <Typography color="text.secondary">
          Email: {userData.user_email}
        </Typography>
        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          color="primary"
          onClick={handleBack} // Manejador de eventos para el clic
        >
          Volver
        </Button>
      </CardContent>
    </Card>
  );
};

Perfil.propTypes = {};

Perfil.defaultProps = {};

export default Perfil;