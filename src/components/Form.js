import React, { useState } from "react";
import algoritmoColas from "../app/algoritmoColas";

export function Form({ getDatos }) {
  const [iteracion, setIteracion] = useState(0);
  const [hInicial, setHInicial] = useState(0);
  const [proxLlegCl, setProxLlegCl] = useState(0);
  const [proxFinServ, setProxFinServ] = useState(0);
  const [q, setQ] = useState(0);
  const [ps, setPs] = useState(0);
  const [intervLlegCl, setIntervLlegCl] = useState(0);
  const [intervServ, setIntervServ] = useState(0);

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

  const onChangeIntervLlegCl = (e) => {
    setIntervLlegCl(numberConverter(e.target.value));
  };

  const onChangeIntervServ = (e) => {
    setIntervServ(numberConverter(e.target.value));
  };

  const numberConverter = (string) => {
    return Number(string);
  };

  const obtenerDatos = (datos) => {
    console.log(datos);
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

      <div>Intervalo de Llegada de un cliente (s)</div>
      <input
        type="number"
        value={intervLlegCl}
        onChange={onChangeIntervLlegCl}
      />

      <div>Intervalo de servicio (s)</div>
      <input type="number" value={intervServ} onChange={onChangeIntervServ} />

      <button
        onClick={() => {
          const form = {
            iteracion,
            hInicial,
            proxLlegCl,
            proxFinServ,
            q,
            ps,
            intervLlegCl,
            intervServ,
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
