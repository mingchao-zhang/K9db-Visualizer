import React, { useState } from "react";
import "./App.css";
import Flow from "./components/FlowComponent/Flow";
import MyCollapse from "./components/MenuComponent/Collapse";
import splitTablesEdges from "./components/UtilComponent/SplitTablesEdges";

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
    console.log(edges);
  };

  const handleSelectedItem = (selectedItem) => {
    setSelectedItem(selectedItem);
    console.log(selectedItem);
  };

  return (
    <div>
      <div className="split left">
        <MyCollapse
          datasubject={datasubject}
          otherTables={otherTables}
          edges={edges}
          handleSelectedItem={handleSelectedItem}
        />
      </div>

      <div className="split right">
        <Flow handleParsedSchema={handleParsedSchema} />
      </div>
    </div>
  );
}
