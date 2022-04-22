import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";

const TableStyles = styled.div`
  .table {
    margin: 0 auto 20px auto;
  }

  .column_title {
    border-bottom: solid 3px red;
    background: white;
    color: #3f51b5;
    padding: 4px 10px;
    border: 2px solid transparent;
    border-radius: 5px 5px 0 0;
    font-weight: bold;
    position: sticky;
    top: 0px;
  }

  .cell {
    padding: 10px;
    background: white;
    border: 2px solid transparent;
  }
`;

export const Table = ({ datos, cabecera }) => {
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

  const columns = React.useMemo(() => cabecera,[cabecera]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <TableStyles>
      <table {...getTableProps()} className='table' >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="column_title">
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
                    <td {...cell.getCellProps()} className="cell">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableStyles>
  );
};
