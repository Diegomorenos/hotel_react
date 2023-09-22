import React from "react";

function ResTable({ reservasList, editarReserva, borrarReserva }) {
  return (
    <div className="opacity-75 bg-light card p-2 col-8">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Numero Reserva</th>
            <th scope="col">Documento</th>
            <th scope="col">Habitacion</th>
            <th scope="col">Cant. Personas</th>
            <th scope="col">Llegada</th>
            <th scope="col">Salida</th>
            <th scope="col">Fecha/hora</th>
            <th scope="col" class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservasList.map((val, key) => (
            <tr key={val.id_reserva}>
              <th>{val.id_reserva}</th>
              <th>{val.id_usuario}</th>
              <th>{val.id_habitacion}</th>
              <td>{val.num_personas}</td>
              <td>{val.llegada}</td>
              <td>{val.salida}</td>
              <td>{val.fecha_hora}</td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    onClick={() => {
                      editarReserva(val);
                    }}
                    className="btn btn-warning"
                  >
                    Actualizar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      borrarReserva(val);
                    }}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResTable;
