import React from "react";

function UserTable({ usuariosList, editarUsuario, borrarUsuario }) {
  return (
    <div className="opacity-75 bg-light card p-2 col-8">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Documento</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Tipo Usuario</th>
            <th scope="col" class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosList.map((val, key) => (
            <tr key={val.id_usuario}>
              <th>{val.id_usuario}</th>
              <td>{val.nombre}</td>
              <td>{val.apellido}</td>
              <td>{val.correo}</td>
              <td>{val.password}</td>
              <td>{val.id_tipo}</td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    onClick={() => {
                      editarUsuario(val);
                    }}
                    className="btn btn-warning"
                  >
                    Actualizar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      borrarUsuario(val);
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

export default UserTable;
