import React, { useState } from "react";
import algoritmoColas from "../app/algoritmoColas";

export function Form({ getDatos }) {
  const [iteracion, setIteracion] = useState('');
  const [hInicial, setHInicial] = useState('');
  const [proxLlegCl, setProxLlegCl] = useState('');
  const [proxFinServ, setProxFinServ] = useState('');
  const [q, setQ] = useState('');
  const [ps, setPs] = useState('');
  const [intervLlegClMin, setIntervLlegClMin] = useState('');
  const [intervLlegClMax, setIntervLlegClMax] = useState('');
  const [intervServMin, setIntervServMin] = useState('');
  const [intervServMax, setIntervServMax] = useState('');

  const onChangeIteracion = (e) => {
    setIteracion(numberConverter(e.target.value));
  };

  const onChangehInicial = (e) => {
    setHInicial(numberConverter(e.target.value));
  };

  const onChangeProxLlegCl = (e) => {
    setProxLlegCl(numberConverter(e.target.value));
  };

  const onChangeProxFinServ = (e) => {
    setProxFinServ(numberConverter(e.target.value));
  };

  const onChangeQ = (e) => {
    setQ(numberConverter(e.target.value));
  };

  const onChangePs = (e) => {
    setPs(numberConverter(e.target.value));
  };

  const onChangeIntervLlegClMin = (e) => {
    setIntervLlegClMin(numberConverter(e.target.value));
  };

  const onChangeIntervLlegClMax = (e) => {
    setIntervLlegClMax(numberConverter(e.target.value));
  };

  const onChangeIntervServMin = (e) => {
    setIntervServMin(numberConverter(e.target.value));
  };

  const onChangeIntervServMax = (e) => {
    setIntervServMax(numberConverter(e.target.value));
  };

  const numberConverter = (string) => {
    return Number(string);
  };

  const obtenerDatos = (datos) => {
    return algoritmoColas(datos);
  };

  return (
    <>
      <div>Cant Iteraciones</div>
      <input type="number" value={iteracion} onChange={onChangeIteracion} />

      <div>Hora de comienzo (int)</div>
      <input type="number" value={hInicial} onChange={onChangehInicial} />

      <div>Proxima llegada de cliente (s)</div>
      <input type="number" value={proxLlegCl} onChange={onChangeProxLlegCl} />

      <div>Proximo fin de servicio (s)</div>
      <input type="number" value={proxFinServ} onChange={onChangeProxFinServ} />

      <div>Cola inicial (int)</div>
      <input type="number" value={q} onChange={onChangeQ} />

      <div>Estado del puesto de servicio (1 = ocupado)</div>
      <input type="number" value={ps} onChange={onChangePs} />

      <div>Intervalo de Llegada de un cliente (s | min - max)</div>
      <input
        type="number"
        value={intervLlegClMin}
        onChange={onChangeIntervLlegClMin}
      />
      <input
        type="number"
        value={intervLlegClMax}
        onChange={onChangeIntervLlegClMax}
      />

      <div>Intervalo de servicio (s | min - max)</div>
      <input type="number" value={intervServMin} onChange={onChangeIntervServMin} />
      <input type="number" value={intervServMax} onChange={onChangeIntervServMax} />

      <button
        onClick={() => {
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
        }}
      >
        Enviar
      </button>
    </>
  );
}
