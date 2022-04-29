const setVariables = (problemNumber, colVP3) => {
  console.log(problemNumber)
    let cabecera
    if (problemNumber === 1){
        cabecera = [
            {
              Header: "Nro Iteracion",
              accessor: "col1",
            },
            {
              Header: "H Actual",
              accessor: "col2",
            },
            {
              Header: "H proxima llegada",
              accessor: "col3",
            },
            {
              Header: "H proximo fin de servicio",
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
            {
              Header: "T legada",
              accessor: "col7",
            },
            {
              Header: "T servicio",
              accessor: "col8",
            },
          ]
    } else if (problemNumber === 2){
        cabecera = [
            {
              Header: "Nro Iteracion",
              accessor: "col1",
            },
            {
              Header: "H Actual",
              accessor: "col2",
            },
            {
              Header: "H de proxima llegada",
              accessor: "col3",
            },
            {
              Header: "H de proximo fin de servicio",
              accessor: "col4",
            },
            {
              Header: "H de comienzo de descanso",
              accessor: "col5",
            },
            {
              Header: "H de vuelta al trabajo",
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
            {
              Header: "T llegada",
              accessor: "col10",
            },
            {
              Header: "T servicio",
              accessor: "col11",
            },
            {
              Header: "T trabajo",
              accessor: "col12",
            },
            {
              Header: "T descanso",
              accessor: "col13",
            },
          ]
    } else if (problemNumber === 3){
        let arr = []
        for(let i=1; i<=colVP3; i++){
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
              Header: "H Actual",
              accessor: "col2",
            },
            {
              Header: "H de proxima llegada",
              accessor: "col3",
            },
            {
              Header: "H de proximo fin de servicio",
              accessor: "col4",
            },
            {
                Header: "H de proximo abandono de cola",
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
              Header: "T llegada",
              accessor: "col8",
            },
            {
              Header: "T servicio",
              accessor: "col9",
            },
            {
                Header: "Hs de abandono",
                columns: arr
              },
          ]
    } else if (problemNumber === 4){
      cabecera = [
          {
            Header: "Nro Iteracion",
            accessor: "col1",
          },
          {
            Header: "H Actual",
            accessor: "col2",
          },
          {
            Header: "H proxima llegada Cliente A",
            accessor: "col3",
          },
          {
            Header: "H proxima llegada Cliente B",
            accessor: "col4",
          },
          {
            Header: "H proximo fin de servicio",
            accessor: "col5",
          },
          {
            Header: "Qa",
            accessor: "col6",
          },
          {
            Header: "Qb",
            accessor: "col7",
          },
          {
            Header: "PS",
            accessor: "col8",
          },
          {
            Header: "T legada Cliente A",
            accessor: "col9",
          },
          {
            Header: "T legada Cliente B",
            accessor: "col10",
          },
          {
            Header: "T servicio",
            accessor: "col11",
          },
        ]
  }
    return cabecera
}

export default setVariables