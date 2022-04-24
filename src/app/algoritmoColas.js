const algoritmoColas = (datos) => {
  // const s = 1;
  let i = 0;
  let aux = false;
  // let s = 1;
  let tiempoLlegada = 0
  let tiempoServicio = 0

  let {
    iteracion,
    hInicial,
    proxLlegCl,
    proxFinServ,
    q,
    ps,
    intervLlegClMin,
    intervLlegClMax,
    intervServMin,
    intervServMax
  } = datos;

  // hInicial = hInicial * 60 * 60;
  // proxLlegCl = hInicial + proxLlegCl;
  // proxFinServ = hInicial + proxFinServ;

  // console.log(intervLlegClMin)

  const eventoProxLlegadaCliente = () => {
    tiempoLlegada = numAleatorio(intervLlegClMin, intervLlegClMax)
    tiempoServicio = numAleatorio(intervServMin, intervServMax)
    if (ps === 0) {
      ps = 1;
      proxFinServ = proxLlegCl + tiempoServicio;
      aux = false;
    } else {
      q += 1;
    }
    proxLlegCl = proxLlegCl + tiempoLlegada;
  };

  const eventoProxFinServ = () => {
    tiempoServicio = numAleatorio(intervServMin, intervServMax)
    ps = 0;
    if (q > 0) {
      ps = 1;
      q -= 1;
      proxFinServ = proxFinServ + tiempoServicio;
    } else {
      // proxFinServ = proxFinServ * 2;
      proxFinServ = null
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

    if (horas > 23){
      horas = horas % 24
    }

    return `${horas}:${minutos}:${segundos}`;
  };


  const numAleatorio = (min, max) => {
    max++
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const principal = () => {
    const data = [];

    if (ps === 0){
      aux = true
    }

    do {
      const fila = {
        col1: i + 1,
        col2: convertir(hInicial),
        col3: convertir(proxLlegCl),
        col4: convertir(proxFinServ, aux),
        col5: q,
        col6: ps,
        col7: tiempoLlegada,
        col8: tiempoServicio
      };

      data.push(fila);
      if ( (proxFinServ == null) || (proxLlegCl <= proxFinServ)) {
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
