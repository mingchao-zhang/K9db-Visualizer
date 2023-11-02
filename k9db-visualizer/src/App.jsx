import React, { useState } from "react";
import "./App.css";
import Flow from "./components/FlowComponent/Flow";
import MyCollapse from "./components/MenuComponent/Collapse";
import splitTablesEdges from "../utils/splitTableEdges"

export default function App() {
  const [selectedItem, setSelectedItem] = useState("");
  const [parsedSchema, setParsedSchema] = useState("");
  const [datasubject, setDatasubject] = useState([]);
  const [otherTables, setOtherTables] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleParsedSchema = (parsedSchema) => {
    setParsedSchema(parsedSchema);
    console.log(parsedSchema);

    let res = splitTablesEdges(parsedSchema);
    setDatasubject(res[0]);
    setOtherTables(res[1]);
    setEdges(res[2]);
  };

  return (
    <div>
      <div className="split left">
        <MyCollapse />
      </div>

      <div className="split right">
        <Flow
          handleParsedSchema={handleParsedSchema}
          parsedDataSubject={datasubject}
          parsedEdges={edges}
          parsedOtherTables={otherTables}
        />
      </div>
    </div>
  );
}
