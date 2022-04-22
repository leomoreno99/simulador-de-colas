const algoritmoColasP2 = (datos) => {
    // const s = 1;
    let i = 0;
    let aux = false;
    let auxCD = false
    let auxVT = false
    // let s = 1;
  
    // let t = 60
    // let d = 30
  
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
  
    // hInicial = hInicial * 60 * 60;
    
    // hInicial = (hInicial * 60 * 60);
    // proxLlegCl = hInicial + proxLlegCl;
    // proxFinServ = hInicial + proxFinServ;
  
    // let hComienzoDescanso = hInicial + 1
    // let hVueltaTrabajo = hInicial * 2
    // console.log('hi: ', hInicial, 'hcd: ', hComienzoDescanso)
  
    const eventoProxLlegadaCliente = () => {
      hInicial = proxLlegCl;
      if (ps === 0) {
        ps = 1;
        if ( s === 0) {
          proxFinServ = hVueltaTrabajo + numAleatorio(intervServMin, intervServMax);
        } else {
          proxFinServ = proxLlegCl + numAleatorio(intervServMin, intervServMax);
        }
        aux = false;
      } else {
        q += 1;
      }
      proxLlegCl = proxLlegCl + numAleatorio(intervLlegClMin, intervLlegClMax);
    };
  
    const eventoProxFinServ = () => {
      hInicial = proxFinServ;
      ps = 0;
      if (q > 0) {
        ps = 1;
        q -= 1;
        proxFinServ = proxFinServ + numAleatorio(intervServMin, intervServMax);
      } else {
        proxFinServ = proxFinServ * 2;
        // proxFinServ = null
        aux = true;
      }
    };
    
    const eventoSalidaServidor = () => {
      hInicial = hComienzoDescanso
      s = 0
      const t = numAleatorio(intervDDMin, intervDDMax)
      hVueltaTrabajo = hComienzoDescanso + t
      if (ps !== 0){
        proxFinServ += t
      }
      hComienzoDescanso = hComienzoDescanso * 2
      auxCD = true
      auxVT = false
    }
  
    const eventoRegresoServidor = () => {
      hInicial = hVueltaTrabajo
      s = 1
      hComienzoDescanso = hInicial + numAleatorio(intervDTMin, intervDTMax)
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
        horas = horas - 24
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