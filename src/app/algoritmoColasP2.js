const algoritmoColasP2 = (datos) => {
    // const s = 1;
    let i = 0;
    let aux = false;
    let auxCD = false
    let auxVT = false

    let tiempoLlegada = 0
    let tiempoServicio = 0
    let tiempoTrabajo = 0
    let tiempoDescanso = 0
  
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
      intervServMax,
      s,
      hComienzoDescanso,
      hVueltaTrabajo,
      intervDTMin,
      intervDTMax,
      intervDDMin,
      intervDDMax
    } = datos;
  
    const eventoProxLlegadaCliente = () => {
      tiempoServicio = numAleatorio(intervServMin, intervServMax)
      tiempoLlegada = numAleatorio(intervLlegClMin, intervLlegClMax)
      hInicial = proxLlegCl;
      if (ps === 0) {
        ps = 1;
        if ( s === 0) {
          proxFinServ = hVueltaTrabajo + tiempoServicio;
        } else {
          proxFinServ = proxLlegCl + tiempoServicio;
        }
        aux = false;
      } else {
        q += 1;
      }
      proxLlegCl = proxLlegCl + tiempoLlegada;
    };
  
    const eventoProxFinServ = () => {
      tiempoServicio = numAleatorio(intervServMin, intervServMax)
      hInicial = proxFinServ;
      ps = 0;
      if (q > 0) {
        ps = 1;
        q -= 1;
        proxFinServ = proxFinServ + tiempoServicio;
      } else {
        proxFinServ = proxFinServ * 2;
        // proxFinServ = null
        aux = true;
      }
    };
    
    const eventoSalidaServidor = () => {
      tiempoDescanso = numAleatorio(intervDDMin, intervDDMax)
      hInicial = hComienzoDescanso
      s = 0
      hVueltaTrabajo = hComienzoDescanso + tiempoDescanso
      if (ps !== 0){
        proxFinServ += tiempoDescanso
      }
      hComienzoDescanso = hComienzoDescanso * 2
      auxCD = true
      auxVT = false
    }
  
    const eventoRegresoServidor = () => {
      tiempoTrabajo = numAleatorio(intervDTMin, intervDTMax)
      hInicial = hVueltaTrabajo
      s = 1
      hComienzoDescanso = hInicial + tiempoTrabajo
      hVueltaTrabajo = hVueltaTrabajo * 2
      auxCD = false
      auxVT = true
    }
  
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
      if(s === 1){
        auxVT = true
      } else {
        auxCD = true
      }
  
      do {
        const fila = {
          col1: i + 1,
          col2: convertir(hInicial),
          col3: convertir(proxLlegCl),
          col4: convertir(proxFinServ, aux),
          col5: convertir(hComienzoDescanso, auxCD),
          col6: convertir(hVueltaTrabajo, auxVT),
          col7: q,
          col8: ps,
          col9: s,
          col10: tiempoLlegada,
          col11: tiempoServicio,
          col12: tiempoTrabajo,
          col13: tiempoDescanso
        };
  
        data.push(fila);
        if ((proxLlegCl <= proxFinServ) && (proxLlegCl <= hComienzoDescanso) && (proxLlegCl <= hVueltaTrabajo)) {
          eventoProxLlegadaCliente();
        } else if ((proxFinServ <= hComienzoDescanso) && (proxFinServ <= hVueltaTrabajo)) {
          eventoProxFinServ();
        } else if (hComienzoDescanso <= hVueltaTrabajo) {
          eventoSalidaServidor();
        } else {
          eventoRegresoServidor();
        }
  
        i++;
      } while (i < iteracion);
      i = 0;
      return data;
    };
    return principal();
  };
  
  export default algoritmoColasP2;