import React, { useState } from "react";
import algoritmoColas from "../app/algoritmoColas";
import Picker from "./Picker";
import styled from "styled-components";
import { Subtitle } from "./Subtitle";
import Button from "./Button";
import setVariables from "../app/setVariables";
import algoritmoColasP2 from "../app/algoritmoColasP2";
import algoritmoColasP3 from "../app/algoritmoColasP3";

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

  .button_group {
    display: flex;
    gap: 1rem;
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

  .p2 {
    display: ${props => props.displayProp};
  }

  .p3 {
    display: ${props => props.displayP3};
  }
  

`;


let colVP3 = 1

export const getColVP3 = (e) => {
  colVP3 = e
};

export function Form({ getDatos, getTableEntry }) {
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

  const [hComienzoDescanso, setHComienzoDescanso] = useState("");
  const [hVueltaTrabajo, setHVueltaTrabajo] = useState("");
  const [s, setS] = useState(0);
  const [intervDTMin, setIntervDTMin] = useState("");
  const [intervDTMax, setIntervDTMax] = useState("");
  const [intervDDMin, setIntervDDMin] = useState("");
  const [intervDDMax, setIntervDDMax] = useState("");

  const [hProxAbCola, sethProxAbCola] = useState("");

  const [numberProblem, setNumberProblem] = useState(1);
  const [display, setDisplay] = useState('')
  const [displayP3, setDisplayP3] = useState('')

  const onChangeIteracion = (e) => {
    setIteracion(numberConverter(e.target.value));
  };

  const onChangeQ = (e) => {
    setQ(numberConverter(e.target.value));
  };

  const onChangePs = (e) => {
    setPs(numberConverter(e.target.value));
  };

  const onChangeS = (e) => {
    setS(numberConverter(e.target.value));
  };

  const numberConverter = (string) => {
    return Number(string);
  };

  const obtenerDatos = (datos) => {
    if(numberProblem === 1){
      return algoritmoColas(datos);
    } else if (numberProblem === 2){
      return algoritmoColasP2(datos);
    } else if (numberProblem === 3){
      return algoritmoColasP3(datos)
    }
  };

  const changeVariables = (problemNumber, colVP3) => {
    return setVariables(problemNumber,colVP3)
  }

  return (
    <StyleForm displayProp={display} displayP3={displayP3} >
      <div>
        <h1>Simulador de colas</h1>
        <p>(Problema 1)</p>
      </div>

      <div className="button_group" >
        <Button text='Problema 1' onClick={() => {
          setNumberProblem(1)
          getTableEntry(changeVariables(1))
          setDisplay('none')
          setDisplayP3('none')
          }} />
        <Button text='Problema 2' onClick={() => {
          setNumberProblem(2)
          getTableEntry(changeVariables(2))
          setDisplay('')
          setDisplayP3('none')
          }} />
          <Button text='Problema 3' onClick={() => {
          setNumberProblem(3)
          setDisplay('none')
          setDisplayP3('')
          }} />
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

      <div className='pickers_container p2'>
        <div className="picker_group p2" >
          <Picker getSeconds={setHComienzoDescanso} name="Hora de comienzo descanso" />
          <Picker getSeconds={setHVueltaTrabajo} name="Hora de vuelta al trabajo" />
        </div>
      </div>

      <div className='pickers_container p3'>
        <div className="picker_group p3" >
          <Picker getSeconds={sethProxAbCola} name="Hora de proximo abandono de cola" />
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

      <div className="p2" >
        <Subtitle text="Estado inicial del servidor (1 = presente)" />
        <input className="input__int" type="number" value={s} onChange={onChangeS} />
      </div>


      <div className='pickers_container' >
        <Subtitle text="Intervalo de Llegada de un cliente (s)" />
        <div className="picker_group" >
          <Picker getSeconds={setIntervLlegClMin} name="Min" />
          <Picker getSeconds={setIntervLlegClMax} name="Max" />
        </div>
      </div>
      
      <div className='pickers_container' >
        <Subtitle text="Intervalo de servicio (s)" />
        <div className="picker_group" >
          <Picker getSeconds={setIntervServMin} name="Min" formatTime="ss" />
          <Picker getSeconds={setIntervServMax} name="Max" formatTime="ss" />
        </div>
      </div>

      <div className='pickers_container p2' >
        <Subtitle text="Intervalo de duracion de trabajo (s)" />
        <div className="picker_group" >
          <Picker getSeconds={setIntervDTMin} name="Min" formatTime="ss" />
          <Picker getSeconds={setIntervDTMax} name="Max" formatTime="ss" />
        </div>
      </div>

      <div className='pickers_container p2' >
        <Subtitle text="Intervalo de duracion de descanso (s)" />
        <div className="picker_group" >
          <Picker getSeconds={setIntervDDMin} />
          <Picker getSeconds={setIntervDDMax} />
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
            s,
            hComienzoDescanso,
            hVueltaTrabajo,
            intervDTMin,
            intervDTMax,
            intervDDMin,
            intervDDMax,
            hProxAbCola
          };
          const datos = obtenerDatos(form);
          if(numberProblem === 3){
            getTableEntry(changeVariables(3, colVP3))
          } 
          getDatos(datos);
        }} />
    </StyleForm>
  );
}
