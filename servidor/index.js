const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const bd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "bd_hotel"
});

//METODO REGISTRAR
app.post("/create",(req, res) => {
    const id_usuario = req.body.id_usuario;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const password = req.body.password;
    const id_tipo = req.body.id_tipo;

    bd.query('INSERT INTO datos_usuario (id_usuario,nombre,apellido,correo,password,id_tipo) VALUES (?,?,?,?,?,?)',[id_usuario, nombre, apellido, correo, password, id_tipo],
    (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.send("registro exitoso")
        }
    });
});

//--//
app.post("/createRes",(req, res) => {
    const id_reserva = req.body.id_reserva;
    const id_usuario = req.body.id_usuario;
    const id_habitacion = req.body.id_habitacion;
    const num_personas = req.body.num_personas;
    const llegada = req.body.llegada;
    const salida = req.body.salida;
    const fecha_hora = req.body.fecha_hora;

    bd.query('INSERT INTO reservas (id_reserva,id_usuario,id_habitacion,num_personas,llegada,salida,fecha_hora) VALUES (?,?,?,?,?,?,?)',[id_reserva, id_usuario, id_habitacion, num_personas, llegada, salida, fecha_hora],
    (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.send("registro exitoso")
        }
    });
});

//METODO LISTAR
app.get("/usuarios", (req,res)=>{
    bd.query('SELECT * FROM datos_usuario', (err, result)=>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

//--//
app.get("/reservas", (req,res)=>{
    bd.query('SELECT * FROM reservas', (err, result)=>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

//METODO ACTUALIZAR
app.put("/update",(req,res)=>{
    const id_usuario = req.body.id_usuario;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const password = req.body.password;
    const id_tipo = req.body.id_tipo;

    bd.query('UPDATE datos_usuario SET id_usuario=?, nombre=?, apellido=?, correo=?, password=?, id_tipo=? WHERE id_usuario=?', [id_usuario, nombre, apellido, correo, password, id_tipo, id_usuario],
    (err, result)=>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

//--//
app.put("/updateRes",(req,res)=>{
    const id_reserva = req.body.id_reserva;
    const id_usuario = req.body.id_usuario;
    const id_habitacion = req.body.id_habitacion;
    const num_personas = req.body.num_personas;
    const llegada = req.body.llegada;
    const salida = req.body.salida;
    const fecha_hora = req.body.fecha_hora;

    bd.query('UPDATE reservas SET id_reserva=?, id_usuario=?, id_habitacion=?, num_personas=?, llegada=?, salida=?, fecha_hora=? WHERE id_reserva=?', [id_reserva, id_usuario, id_habitacion, num_personas, llegada, salida, fecha_hora, id_reserva],
    (err, result)=>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


//METODO BORRAR
app.delete("/delete/:id_usuario",(req,res)=>{
    const id_usuario = req.params.id_usuario;

    bd.query("DELETE FROM datos_usuario WHERE id_usuario=?",id_usuario,
    (err,result) => {
        if(err) {
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

//__//
app.delete("/deleteRes/:id_reserva",(req,res)=>{
    const id_reserva = req.params.id_reserva;

    bd.query("DELETE FROM reservas WHERE id_reserva=?",id_reserva,
    (err,result) => {
        if(err) {
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.listen(3001,()=>{
    console.log("puerto activo")
})