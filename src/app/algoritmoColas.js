const algoritmoColas = (datos) => {
  // const s = 1;
  let i = 0;
  let aux = false;

  let {
    iteracion,
    hInicial,
    proxLlegCl,
    proxFinServ,
    q,
    ps,
    intervLlegCl,
    intervServ,
  } = datos;

  hInicial = hInicial * 60 * 60;
  proxLlegCl = hInicial + proxLlegCl;
  proxFinServ = hInicial + proxFinServ;

  const eventoProxLlegadaCliente = () => {
    if (ps === 0) {
      ps = 1;
      proxFinServ = proxLlegCl + intervServ;
      aux = false;
    } else {
      q += 1;
    }
    proxLlegCl = proxLlegCl + intervLlegCl;
  };

  const eventoProxFinServ = () => {
    ps = 0;
    if (q > 0) {
      ps = 1;
      q -= 1;
      console.log("antes: ", proxFinServ);
      proxFinServ = proxFinServ + intervServ;
      console.log("despues: ", proxFinServ);
    } else {
      proxFinServ = proxFinServ * 2;
      aux = true;
    }
  };

  const convertir = (seg, aux = false) => {
    let segundos = 0;
    let horas = 0;
    let minutos = 0;

    if (aux) {
      segundos = "-";
      horas = "-";
      minutos = "-";
    } else {
      segundos = Math.round(seg % 0x3c).toString();
      horas = Math.floor(seg / 0xe10).toString();
      minutos = (Math.floor(seg / 0x3c) % 0x3c).toString();
    }

    return `${horas}:${minutos}:${segundos}`;
  };

  const principal = () => {
    const data = [];

    do {
      const fila = {
        col1: i + 1,
        col2: convertir(hInicial),
        col3: convertir(proxLlegCl),
        col4: convertir(proxFinServ, aux),
        col5: q,
        col6: ps,
      };

      data.push(fila);
      if (proxLlegCl <= proxFinServ) {
        hInicial = proxLlegCl;
        eventoProxLlegadaCliente();
      } else {
        hInicial = proxFinServ;
        eventoProxFinServ();
      }

      i++;
    } while (i < iteracion);
    i = 0;
    return data;
  };

  return principal();
};

export default algoritmoColas;
