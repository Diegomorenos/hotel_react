import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";
import ResTable from "./ResTable";

function Reserva() {
  const [id_reserva, setId_reserva] = useState("");
  const [id_usuario, setId_usuario] = useState("");
  const [id_habitacion, setId_habitacion] = useState("");
  const [num_personas, setNum_personas] = useState("");
  const [llegada, setLlegada] = useState("");
  const [salida, setSalida] = useState("");
  const [fecha_hora, setFecha_hora] = useState();
  const [editarRes, setEditarRes] = useState(false);
  const [reservasList, setReservas] = useState([]);

  // Método para agregar una reserva
  const addRes = () => {
    Axios.post("http://localhost:3001/createRes", {
      id_reserva: id_reserva,
      id_usuario: id_usuario,
      id_habitacion: id_habitacion,
      num_personas: num_personas,
      llegada: llegada,
      salida: salida,
      fecha_hora: fecha_hora
    })
      .then(() => {
        listarRes();
        clearRes();
        Swal.fire({
          title: "<strong>Registro exitoso</strong>",
          html: "<i>Se generó una nueva reserva <strong>" + id_usuario + "</strong> fue registrado con éxito</i>",
          icon: "success",
          timer: 3000
        });
      })
      .catch(function (error) {
        alert(llegada);
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
        });
      });
  }

  // Método para eliminar una reserva
  const borrarReserva = (val) => {
    Swal.fire({
      title: "Confirmar",
      html: "<i>¿Realmente desea eliminar la reserva nro <strong>" + val.id_reserva + "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#ff0000",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteRes/${val.id_reserva}`)
          .then((res) => {
            listarRes();
            clearRes();
            Swal.fire({
              icon: "success",
              title: "La reserva "+ val.id_reserva + " fue eliminada",
              showConfirmButton: false,
              timer: 2000
            });
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "¡Oops...!",
              text: "NO se logró eliminar la reserva",
              footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
            });
          });
      }
    });
  }

  // Método para limpiar campos
  const clearRes = () => {
    setId_reserva("");
    setId_usuario("");
    setId_habitacion("");
    setNum_personas("");
    setLlegada("");
    setSalida("");
    setFecha_hora("");
    setEditarRes(false);
  }

  // Método para editar una reserva
  const editarReserva = (val) => {
    setEditarRes(true);
    setId_reserva(val.id_reserva);
    setId_usuario(val.id_usuario);
    setId_habitacion(val.id_habitacion);
    setNum_personas(val.num_personas);
    setLlegada(val.llegada);
    setSalida(val.salida);
    setFecha_hora(val.fecha_hora);
  }

  // Método para actualizar una reserva
  const update = () => {
    Axios.put("http://localhost:3001/updateRes", {
      id_reserva: id_reserva,
      id_usuario: id_usuario,
      id_habitacion: id_habitacion,
      num_personas: num_personas,
      llegada: llegada,
      salida: salida,
      fecha_hora: fecha_hora
    })
      .then(() => {
        listarRes();
        clearRes();
        alert("Actualizado");
      })
      .catch(function (error) {
        alert("Error");
      });
  }

  // Método para listar reservas
  const listarRes = () => {
    Axios.get("http://localhost:3001/reservas")
      .then((response) => {
        setReservas(response.data);
      });
  }

  //useEffect para cargar los datos al cargar el componente
  useEffect(() => {
    listarRes();
  }, []);

  return (
    <div className="p-2">
      <h2 className="card-header text-center p-2">GESTIÓN DE RESERVAS</h2>
      <div className="contenido">
        <div className="opacity-75 bg-dark text-light card col-3">
          <form className="was-validated p-4">
            <div className="mt-2 d-flex justify-content-around">
              <h4>DATOS DE RESERVA</h4>
            </div>
            <div className="mb-2">
              <label htmlFor="" className="form-label">Número de Documento</label>
              <input
                type="text"
                onChange={(event) => { setId_usuario(event.target.value); }}
                value={id_usuario}
                className="form-control"
                placeholder="Número de identificación del cliente"
                required
              ></input>
            </div>
            <div className="mb-2">
            <label for="" className="form-label">Tipo Habitacion</label>
            <input type="text" onChange={(event) => { setId_habitacion(event.target.value); }} value={id_habitacion} className="form-control" placeholder="Por favor digite tipo habitacion" required></input>
          </div>

          <div className="mb-2">
            <label for="" className="form-label">Numero de Personas</label>
            <input type="text" onChange={(event) => { setNum_personas(event.target.value); }} value={num_personas} className="form-control" placeholder="Por favor digite cantidad de personas" required></input>
          </div>

          <div className="mb-2">
            <label for="" className="form-label">Fecha de llegada</label>
            <input type="date" onChange={(event) => { setLlegada(event.target.value); }} value={llegada} className="form-control" placeholder="Seleccione fecha de llegada" required></input>
          </div>

          <div className="mb-2">
            <label for="" className="form-label">Fecha de salida</label>
            <input type="date" onChange={(event) => { setSalida(event.target.value); }} value={salida} className="form-control" placeholder="Seleccione fecha de salida" required></input>
          </div>

            <div>
              <button className="btn btn-success m-2" onClick={addRes}>Registrar</button>
              <button className="btn btn-warning m-2" onClick={update}>Actualizar</button>
              <button className="btn btn-info m-2" onClick={clearRes}>Cancelar</button>
            </div>
          </form>
        </div>

        <ResTable
          reservasList={reservasList}
          editarReserva={editarReserva}
          borrarReserva={borrarReserva}
        />
      </div>
    </div>
  );
}

export default Reserva;