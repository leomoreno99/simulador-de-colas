import { getColVP3 } from "../components/Form";

const algoritmoColasP3 = (datos) => {
    let i = 0;
    let aux = false;
    let tiempoAbandono = 120
    let contLengthArr = 1

    let arrHoraAbandono = []
    let objHoraAbandono = {}

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
      hProxAbCola
    } = datos;
  
    const abandonoDeCola = () => {
      q -= 1;
      arrHoraAbandono.shift()
      hProxAbCola = arrHoraAbandono[0]

      for (let i=1; i<=arrHoraAbandono.length; i++){
        objHoraAbandono[`v${i}`] = convertir(arrHoraAbandono[i-1])
    }
    
    }
  
    const eventoProxLlegadaCliente = () => { 
      if (ps === 0) {
        ps = 1;
        proxFinServ = proxLlegCl + numAleatorio(intervServMin, intervServMax);
        aux = false;
      } else {
        if(q === 0){
            hProxAbCola = proxLlegCl + tiempoAbandono
        }
        q += 1;
        arrHoraAbandono.push(proxLlegCl + tiempoAbandono)
        arrHoraAbandono.sort((a, b) => a -b)

        for (let i=1; i<=arrHoraAbandono.length; i++){
            objHoraAbandono[`v${i}`] = convertir(arrHoraAbandono[i-1])
        }

      }

      if (arrHoraAbandono.length > contLengthArr){
          contLengthArr = arrHoraAbandono.length
      }

      proxLlegCl = proxLlegCl + numAleatorio(intervLlegClMin, intervLlegClMax);
    };
  
    const eventoProxFinServ = () => {
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
  
      do {
        const fila = {
          col1: i + 1,
          col2: convertir(hInicial),
          col3: convertir(proxLlegCl),
          col4: convertir(proxFinServ, aux),
          col5: convertir(hProxAbCola),
          col6: q,
          col7: ps,
          ...objHoraAbandono
        };
  
        data.push(fila);
        if ((proxLlegCl <= proxFinServ) && (proxLlegCl <= hProxAbCola) ) {
          hInicial = proxLlegCl;
          eventoProxLlegadaCliente();
        } else if(proxFinServ <= hProxAbCola) {
          hInicial = proxFinServ;
          eventoProxFinServ();
        } else {
            hInicial = hProxAbCola;
            abandonoDeCola()
        }
        console.log(objHoraAbandono)
        i++;
      } while (i < iteracion);
      i = 0;
      getColVP3(contLengthArr)
    //   getColVP3(Object.keys(objHoraAbandono).length)
      return data;
    };
    return principal();
  };
  
  export default algoritmoColasP3;
  