import React, { useState } from "react";
import algoritmoColas from "../app/algoritmoColas";
import Picker from "./Picker";
import styled from "styled-components";
import { Subtitle } from "./Subtitle";
import Button from "./Button";

const StyleForm = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  margin: 20px auto;
  /* margin-left: 0; */
  padding: 20px;
  border-radius: 10px;
  gap: 20px;
  background-color: white;

  h1, p {
    display: inline;
    margin-right: 5px;
    color: #3f51b5;
  }

  .pickers_container {
    display: flex;
    flex-direction: column;
  }

  .picker_group {
    display: flex;
  }

  .input__int {
    padding: 3px;
    width: 60px;
    border: none;
    border-bottom: 1px solid black;
    font-family: 'Roboto';
    font-size: 1rem;
  }

`;

export function Form({ getDatos }) {
  const [iteracion, setIteracion] = useState(0);
  const [hInicial, setHInicial] = useState("");
  const [proxLlegCl, setProxLlegCl] = useState("");
  const [proxFinServ, setProxFinServ] = useState("");
  const [q, setQ] = useState(0);
  const [ps, setPs] = useState(0);
  const [intervLlegClMin, setIntervLlegClMin] = useState("");
  const [intervLlegClMax, setIntervLlegClMax] = useState("");
  const [intervServMin, setIntervServMin] = useState("");
  const [intervServMax, setIntervServMax] = useState("");

  const onChangeIteracion = (e) => {
    setIteracion(numberConverter(e.target.value));
  };

  const onChangeQ = (e) => {
    setQ(numberConverter(e.target.value));
  };

  const onChangePs = (e) => {
    setPs(numberConverter(e.target.value));
  };

  const numberConverter = (string) => {
    return Number(string);
  };

  const obtenerDatos = (datos) => {
    return algoritmoColas(datos);
  };

  return (
    <StyleForm>
      <div>
        <h1>Simulador de colas</h1>
        <p>(Problema 1)</p>
      </div>
      
      <div>
        <Subtitle text="Numero de iteraciones" />
        <input className="input__int" type="number" value={iteracion} onChange={onChangeIteracion} />
      </div>


      <div className='pickers_container' >
        <div className="picker_group" >
          <Picker getSeconds={setHInicial} name="Hora de comienzo" />
          <Picker getSeconds={setProxLlegCl} name="Proxima llegada del cliente" />
          <Picker getSeconds={setProxFinServ} name="Proximo fin de servicio" />
        </div>
      </div>

      <div>
        <Subtitle text="Cola inicial" />
        <input className="input__int" type="number" value={q} onChange={onChangeQ} />
      </div>
      
      <div>
        <Subtitle text="Estado inicial del puesto de servicio (1 = ocupado)" />
        <input className="input__int" type="number" value={ps} onChange={onChangePs} />
      </div>


      <div className='pickers_container' >
        <Subtitle text="Intervalo de Llegada de un cliente (s)" />
        <div className="picker_group" >
          <Picker getSeconds={setIntervLlegClMin} name="Min" formatTime="ss" />
          <Picker getSeconds={setIntervLlegClMax} name="Max" formatTime="ss" />
        </div>
      </div>
      
      <div className='pickers_container' >
        <Subtitle text="Intervalo de servicio (s)" />
        <div className="picker_group" >
          <Picker getSeconds={setIntervServMin} name="Min" formatTime="ss" />
          <Picker getSeconds={setIntervServMax} name="Max" formatTime="ss" />
        </div>
      </div>
      
      
      <Button text='Simular' onClick={() => {
          const form = {
            iteracion,
            hInicial,
            proxLlegCl,
            proxFinServ,
            q,
            ps,
            intervLlegClMin,
            intervLlegClMax,
            intervServMin,
            intervServMax,
          };
          const datos = obtenerDatos(form);
          getDatos(datos);
        }} />
    </StyleForm>
  );
}
