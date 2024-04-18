const express = require("express");
const cors = require("cors");
const app = express();
const port = 3008;
const { Sequelize, DataTypes } = require("sequelize");

app.use(cors());
// Express middleware for parsing JSON
app.use(express.json());

// Database connection
const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "1234",
  database: "grupo5db",
});

// Entity class for dynamic table creation
class Entity {
  constructor(name, fields) {
    this.name = name;
    this.model = sequelize.define(name, fields);
  }
  async sync() {
    await this.model.sync({ force: true });
    console.log(`Table for ${this.name} synchronized`);
  }
}

// Define schemas for User, Libro, and Apartado entities
const userSchema = {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  user_last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
};

const libroSchema = {
  libro_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre_libro: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  nombre_autor: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  cantidad_disponible: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
};

const apartadosSchema = {
  apartado_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre_libro: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
};

// Create User, Libro, and Apartado entities using the schemas
const User = new Entity("User", userSchema);
const Libro = new Entity("Libro", libroSchema);
const Apartado = new Entity("Apartado", apartadosSchema);

// Synchronize the database with the defined models
const syncronizeDB = async () => {
  try {
    await sequelize.sync();
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};
//syncronizeDB();

// Routes

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// User routes
app.post("/login", async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const user = await User.model.findOne({
      where: {
        user_email: user_email,
        user_password: user_password,
      },
    });
    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { user_email, user_name, user_last_name, user_password } = req.body;
    const user = await User.model.create({
      user_email,
      user_name,
      user_last_name,
      user_password,
    });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.model.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    await User.model.destroy({
      where: {
        user_id,
      },
    });
    res.status(204).json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { user_email, user_name, user_last_name, user_password } = req.body;
    await User.model.update(
      {
        user_email,
        user_name,
        user_last_name,
        user_password,
      },
      {
        where: {
          user_id,
        },
      }
    );
    res.status(204).json({ message: "User updated" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Libro routes
app.get("/libros", async (req, res) => {
  try {
    const libros = await Libro.model.findAll();
    res.status(200).json(libros);
  } catch (error) {
    console.error("Error fetching libros:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/libros/:libro_id", async (req, res) => {
  try {
    const { libro_id } = req.params;
    await Libro.model.destroy({
      where: {
        libro_id,
      },
    });
    res.status(204).json({ message: "Libro deleted" });
  } catch (error) {
    console.error("Error deleting libro:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/libros/:libro_id", async (req, res) => {
  try {
    const { libro_id } = req.params;
    const { nombre_autor, nombre_libro, cantidad_disponible } = req.body;
    await Libro.model.update(
      {
        nombre_autor,
        nombre_libro,
        cantidad_disponible,
      },
      {
        where: {
          libro_id,
        },
      }
    );
    res.status(204).json({ message: "Libro updated" });
  } catch (error) {
    console.error("Error updating libro:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ReservaLibro routes
app.post("/reservaLibros", async (req, res) => {
  try {
    const { nombre_libro, nombre_usuario } = req.body;
    const nuevaReserva = await Apartado.model.create({
      nombre_libro,
      nombre_usuario,
    });
    res.status(201).json({ message: "Reserva realizada", reserva: nuevaReserva });
  } catch (error) {
    console.error("Error realizando reserva:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/reservaLibros", async (req, res) => {
  try {
    const reservas = await Apartado.model.findAll();
    res.status(200).json(reservas);
  } catch (error) {
    console.error("Error obteniendo reservas de libros:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/reservaLibros/:reserva_id", async (req, res) => {
  try {
    const { reserva_id } = req.params;
    await Apartado.model.destroy({
      where: {
        apartado_id: reserva_id,
      },
    });
    res.status(204).json({ message: "Reserva de libro eliminada" });
  } catch (error) {
    console.error("Error eliminando reserva de libro:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/reservaLibros/:reserva_id", async (req, res) => {
  try {
    const { reserva_id } = req.params;
    const { nombre_libro, nombre_usuario } = req.body;
    await Apartado.model.update(
      {
        nombre_libro,
        nombre_usuario,
      },
      {
        where: {
          apartado_id: reserva_id,
        },
      }
    );
    res.status(204).json({ message: "Reserva de libro actualizada" });
  } catch (error) {
    console.error("Error actualizando reserva de libro:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/registroLibro", async (req, res) => {
  try {
    const { nombre_autor, nombre_libro, cantidad_disponible } = req.body;
    console.log("req.body");
    console.log(req.body);
    const libro = await Libro.model.create({
      nombre_autor,
      nombre_libro,
      cantidad_disponible
    });
    res.status(201).json({ message: "Libro created", libro });
  } catch (error) {
    console.error("Error creating libro:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
