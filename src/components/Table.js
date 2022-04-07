import React from "react";
import { useTable } from "react-table";



export const Table = ({datos}) => {

    // console.log('LAPUTAMADRE: ', datos)

    // console.log(datos)
  //   const data = React.useMemo(() => [
  //       {
  //         col1: "Hello",
  //         col2: "World",
  //       },
  //       {
  //         col1: "react-table",
  //         col2: "rocks",
  //       },
  //       {
  //         col1: "whatever",
  //         col2: "you want",
  //       },
  //     ],
  //     []
  //   );

  const data = React.useMemo(() => datos, [datos]);

  const columns = React.useMemo(
    () => [
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
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px red",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold",
                  paddingRight: '50px',
                  position: 'sticky',
                  top: '0px'
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: "papayawhip",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
