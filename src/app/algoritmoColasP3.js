import { getColVP3 } from "../components/Form";

const algoritmoColasP3 = (datos) => {
  let i = 0;
  let aux = false;
  let auxAbCola = false;
  let contLengthArr = 1;
  let hProxAbCola = 90000
  let tiempoLlegada = 0
  let tiempoServicio = 0

  let arrHoraAbandono = [];
  let objHoraAbandono = {};

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
    intervTECMin,
    intervTECMax,
  } = datos;

  const cargarListaVectores = () => {
    objHoraAbandono = {};
    for (let i = 1; i <= arrHoraAbandono.length; i++) {
      objHoraAbandono[`v${i}`] = convertir(arrHoraAbandono[i - 1]);
    }
  };

  const abandonoDeCola = () => {
    q -= 1;
    arrHoraAbandono.splice(
      arrHoraAbandono.indexOf(Math.min(...arrHoraAbandono)),
      1
    );
    hProxAbCola = Math.min(...arrHoraAbandono);

    if(q===0){
        auxAbCola = true
    }

    cargarListaVectores();
  };

  const eventoProxLlegadaCliente = () => {
    tiempoServicio = numAleatorio(intervServMin, intervServMax)
    tiempoLlegada = numAleatorio(intervLlegClMin, intervLlegClMax)
    const tiempoAbandono = numAleatorio(intervTECMin, intervTECMax);
    if (ps === 0) {
      ps = 1;
      proxFinServ = proxLlegCl + tiempoServicio;
      aux = false;
    } else {
      q += 1;
      arrHoraAbandono.push(proxLlegCl + tiempoAbandono);
      hProxAbCola = Math.min(...arrHoraAbandono);
      cargarListaVectores();
      auxAbCola = false
    }
    if (arrHoraAbandono.length > contLengthArr) {
      contLengthArr = arrHoraAbandono.length;
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

      arrHoraAbandono.shift();
      hProxAbCola = Math.min(...arrHoraAbandono);

      auxAbCola = false
      if(q===0){
        auxAbCola = true
        }
      cargarListaVectores();
    } else {
      proxFinServ = proxFinServ * 2;
      aux = true;
      auxAbCola = true;
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

    if (horas > 23) {
        horas = horas % 24
    }

    return `${horas}:${minutos}:${segundos}`;
  };

  const numAleatorio = (min, max) => {
    max++;
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const principal = () => {
    const data = [];

    if (ps === 0){
        aux = true
    }

    if (q > 0){
        for(let i=0; i<q; i++){
            arrHoraAbandono.push(hInicial + numAleatorio(intervTECMin, intervTECMax))
        }
        hProxAbCola = Math.min(...arrHoraAbandono);
        contLengthArr = q
        cargarListaVectores()
        console.log(arrHoraAbandono)
    }else{
        auxAbCola = true
    }

    do {
      const fila = {
        col1: i + 1,
        col2: convertir(hInicial),
        col3: convertir(proxLlegCl),
        col4: convertir(proxFinServ, aux),
        col5: convertir(hProxAbCola, auxAbCola),
        col6: q,
        col7: ps,
        col8: tiempoLlegada,
        col9: tiempoServicio,
        ...objHoraAbandono,
      };

      data.push(fila);
      if (proxLlegCl <= proxFinServ && proxLlegCl <= hProxAbCola) {
        hInicial = proxLlegCl;
        eventoProxLlegadaCliente();
      } else if (proxFinServ <= hProxAbCola) {
        hInicial = proxFinServ;
        eventoProxFinServ();
      } else {
        hInicial = hProxAbCola;
        abandonoDeCola();
      }

      i++;
    } while (i < iteracion);
    i = 0;
    getColVP3(contLengthArr);
    return data;
  };
  return principal();
};

export default algoritmoColasP3;
