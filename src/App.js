import { useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Table } from "./components/Table";

function App() {
  const [datos, setDatos] = useState([]);

  const getDatos = (e) => {
    setDatos(e);
  };

  return (
    <div className="container">
      <Form getDatos={getDatos} />
      <Table datos={datos} />
    </div>
  );
}

export default App;
