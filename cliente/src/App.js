import './App.css';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Reserva from './Reserva';
import User from './User';

function App() {

  const [Main, setMain] = useState(<User/>);

  const callUser=()=>{
    setMain(<User/>);
  }

  const callRes=()=>{
    setMain(<Reserva/>);
  }

  return (
  <div className='cuerpo'>
    <h1 className='text-center text-light p-2'>Hoteleria</h1>
    <div className="p-2 container col-8 d-flex justify-content-around">
      <button className="w-25 btn btn-success" onClick={callUser}>Usuarios</button>
      <button className="w-25 btn btn-success" onClick={callRes}>Reservas</button>
    </div>
    {Main}
  </div>
  );
}

export default App;