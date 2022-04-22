const setVariables = (problemNumber, colVP3) => {
    let cabecera
    if (problemNumber === 1){
        cabecera = [
            {
              Header: "Nro Iteracion",
              accessor: "col1",
            },
            {
              Header: "Hora Actual",
              accessor: "col2",
            },
            {
              Header: "Hora de proxima llegada",
              accessor: "col3",
            },
            {
              Header: "Hora de proximo fin de servicio",
              accessor: "col4",
            },
            {
              Header: "Q",
              accessor: "col5",
            },
            {
              Header: "PS",
              accessor: "col6",
            },
          ]
    } else if (problemNumber === 2){
        cabecera = [
            {
              Header: "Nro Iteracion",
              accessor: "col1",
            },
            {
              Header: "Hora Actual",
              accessor: "col2",
            },
            {
              Header: "Hora de proxima llegada",
              accessor: "col3",
            },
            {
              Header: "Hora de proximo fin de servicio",
              accessor: "col4",
            },
            {
              Header: "Hora de comienzo de descanso",
              accessor: "col5",
            },
            {
              Header: "Hora de vuelta al trabajo",
              accessor: "col6",
            },
            {
              Header: "Q",
              accessor: "col7",
            },
            {
              Header: "PS",
              accessor: "col8",
            },
            {
              Header: "S",
              accessor: "col9",
            },
          ]
    } else if (problemNumber === 3){
        let arr = []
        for(let i=1; i<=colVP3; i++){
        // for(let i=1; i<=20; i++){
            arr.push({
                Header: `v${i}`,
                accessor: `v${i}`
            })
        }

        cabecera = [
            {
              Header: "Nro Iteracion",
              accessor: "col1",
            },
            {
              Header: "Hora Actual",
              accessor: "col2",
            },
            {
              Header: "Hora de proxima llegada",
              accessor: "col3",
            },
            {
              Header: "Hora de proximo fin de servicio",
              accessor: "col4",
            },
            {
                Header: "Hora de proximo abandono de cola",
                accessor: "col5",
              },
            {
              Header: "Q",
              accessor: "col6",
            },
            {
              Header: "PS",
              accessor: "col7",
            },
            {
                Header: "Horas de abandono",
                columns: arr
                
                // [
                //     {
                //         Header: "v1",
                //         accessor: "v1"
                //     },
                //     {
                //         Header: "v2",
                //         accessor: "v2"
                //     },
                //     {
                //         Header: "v3",
                //         accessor: "v3"
                //     }
                // ]
              },
          ]
    }
    return cabecera
}

export default setVariables