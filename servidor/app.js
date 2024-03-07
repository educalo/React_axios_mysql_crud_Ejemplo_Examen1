const express = require("express");
const app = express();
const mysql = require("mysql"); // https://github.com/mysqljs/mysql npm install mysqljs/mysql
const cors = require("cors"); //https://www.npmjs.com/package/cors npm i cors
   
//const port = 3000
   
app.use(cors());
app.use(express.json());
 
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "libros",
});
 
app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
app.get("/libros", (req, res) => {
  const q = "SELECT * FROM libro";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
 
app.post("/create", (req, res) => {
    const isbn = req.body.isbn;
    const titulo = req.body.titulo;
    const autor = req.body.autor;
    const genero = req.body.genero;
    const resumen = req.body.resumen;
     
    db.query(
      "INSERT INTO libro (isbn, titulo, autor, genero, resumen) VALUES (?,?,?,?,?)",
      [isbn, titulo, autor, genero, resumen],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("You have registered successfully!");
        }
      }
    );
}); 
 
app.get("/librodetails/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM libro WHERE isbn = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
 
app.delete("/libro/:id", (req, res) => {
  const userId = req.params.id;
  const q = " DELETE FROM libro WHERE isbn = ? ";
 
  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
 
app.put("/libro/:id", (req, res) => {
  const userId = req.params.id;
  const q = "UPDATE libro SET `titulo`= ?, `autor`= ?, `genero`= ?, `resumen`= ? WHERE isbn = ?";
 
  const values = [
    req.body.titulo,
    req.body.autor,
    req.body.genero,
    req.body.resumen,
  ];
 
  db.query(q, [...values,userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
 

 
app.listen(3001, () => {
    console.log("El servidor esta en escucha en el puerto 3001");
});