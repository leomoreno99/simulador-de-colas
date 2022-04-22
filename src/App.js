import { useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Table } from "./components/Table";

function App() {
  const [datos, setDatos] = useState([]);
  const [tableEntry, setTableEntry] = useState([]);

  const getDatos = (e) => {
    setDatos(e);
  };

  const getTableEntry = (e) => {
    setTableEntry(e)
  }

  return (
    <div className="container">
      <Form getDatos={getDatos} getTableEntry={getTableEntry} />
      <Table datos={datos} cabecera={tableEntry}/>
    </div>
  );
}

export default App;
