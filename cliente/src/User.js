import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";
import UserTable from "./UserTable";

function User() {
  const [id_usuario, setId_usuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [id_tipo, setId_tipo] = useState("3");
  const [editar, setEditar] = useState(false);
  const [usuariosList, setUsuarios] = useState([]);

  // Método para agregar un usuario
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      id_usuario: id_usuario,
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      password: password,
      id_tipo: id_tipo
    })
      .then(() => {
        listar();
        clear();
        Swal.fire({
          title: "<strong>Registro exitoso</strong>",
          html: "<i>El usuario <strong>" + nombre + "</strong> fue registrado con éxito</i>",
          icon: "success",
          timer: 3000
        });
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
        });
      });
  }

  // Método para eliminar un usuario
  const borrarUsuario = (val) => {
    Swal.fire({
      title: "Confirmar",
      html: "<i>¿Realmente desea eliminar a <strong>" + val.nombre + "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#ff0000",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id_usuario}`)
          .then((res) => {
            listar();
            clear();
            Swal.fire({
              icon: "success",
              title: val.nombre + " fue eliminado",
              showConfirmButton: false,
              timer: 2000
            });
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "¡Oops...!",
              text: "NO se logró eliminar el usuario",
              footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
            });
          });
      }
    });
  }

  // Método para limpiar campos
  const clear = () => {
    setId_usuario("");
    setNombre("");
    setApellido("");
    setCorreo("");
    setPassword("");
    setEditar(false);
  }

  // Método para editar un usuario
  const editarUsuario = (val) => {
    setEditar(true);
    setId_usuario(val.id_usuario);
    setNombre(val.nombre);
    setApellido(val.apellido);
    setCorreo(val.correo);
    setPassword(val.password);
    setId_tipo(val.id_tipo);
  }

  // Método para actualizar un usuario
  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id_usuario: id_usuario,
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      password: password,
      id_tipo: id_tipo
    })
      .then(() => {
        listar();
        clear();
        alert("Actualizado");
      })
      .catch(function (error) {
        alert("Error");
      });
  }

  // Método para listar usuarios
  const listar = () => {
    Axios.get("http://localhost:3001/usuarios")
      .then((response) => {
        setUsuarios(response.data);
      });
  }

  //useEffect para cargar los datos al cargar el componente
  useEffect(() => {
    listar();
  }, []);

  return (
    <div className="p-2">
      <h2 className="card-header text-center p-2">GESTIÓN DE USUARIOS</h2>
      <div className="contenido">
        <div className="opacity-75 bg-dark text-light card col-3">
          <form className="was-validated p-4">
            <div className="mt-2 d-flex justify-content-around">
              <h4>DATOS DE USUARIO</h4>
            </div>
            <div className="mb-2">
              <label htmlFor="" className="form-label">Número de Documento</label>
              <input
                type="text"
                onChange={(event) => { setId_usuario(event.target.value); }}
                value={id_usuario}
                className="form-control"
                placeholder="Por favor digite su número de identificación"
                required
              ></input>
            </div>
            <div className="mb-2">
            <label for="" className="form-label">Nombres</label>
            <input type="text" onChange={(event) => { setNombre(event.target.value); }} value={nombre} className="form-control" placeholder="Por favor digite su nombre" required></input>
          </div>

          <div className="mb-2">
            <label for="" className="form-label">Apellidos</label>
            <input type="text" onChange={(event) => { setApellido(event.target.value); }} value={apellido} className="form-control" placeholder="Por favor digite sus apellidos" required></input>
          </div>

          <div className="mb-2">
            <label for="" className="form-label">Correo electrónico</label>
            <input type="email" onChange={(event) => { setCorreo(event.target.value); }} value={correo} className="form-control" placeholder="Por favor digite su correo electrónico" required></input>
          </div>

          <div className="mb-2">
            <label for="" className="form-label">Contraseña</label>
            <input type="password" onChange={(event) => { setPassword(event.target.value); }} value={password} className="form-control" placeholder="Por favor digite una contraseña valida" required></input>
          </div>

          <div className="mb-2">
            <label for="" className="form-label">Tipo de Usuario</label>
            <input type="text" onChange={(event) => {
              setId_tipo(event.target.value);
            }} value={id_tipo}
              className="form-control" disabled></input>
          </div>
            <div>
              <button className="btn btn-success m-2" onClick={add}>Registrar</button>
              <button className="btn btn-warning m-2" onClick={update}>Actualizar</button>
              <button className="btn btn-info m-2" onClick={clear}>Cancelar</button>
            </div>
          </form>
        </div>

        <UserTable
          usuariosList={usuariosList}
          editarUsuario={editarUsuario}
          borrarUsuario={borrarUsuario}
        />
      </div>
    </div>
  );
}

export default User;
