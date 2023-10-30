import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./menu.css";

function MyCollapse({ datasubject, otherTables, edges }) {
  const [openDS, setOpenDS] = useState(false);
  const [openT, setOpenT] = useState(false);
  const [openE, setOpenE] = useState(false);

  const toggleCollapseDS = () => {
    setOpenDS(!openDS);
  };

  const toggleCollapseT = () => {
    setOpenT(!openT);
  };

  const toggleCollapseE = () => {
    setOpenE(!openE);
  };

  return (
    <div>
      <>
        <div className="Buttons">
          <Button onClick={toggleCollapseDS}>Data Subjects</Button>
          {openDS && (
            <div className="collapse">
              {datasubject.map((element, index) => (
                <Card key={index} body style={{ width: "200px" }}>
                  {element}
                </Card>
              ))}
            </div>
          )}
          <Button onClick={toggleCollapseT}>Other Tables</Button>
          {openT && (
            <div className="collapse">
              {otherTables.map((element, index) => (
                <Card key={index} body style={{ width: "200px" }}>
                  {element}
                </Card>
              ))}
            </div>
          )}
          <Button onClick={toggleCollapseE}>Edges</Button>
          {openE && (
            <div className="collapse">
              {edges.map((element, index) => (
                <Card body style={{ width: "200px" }}>
                  {element.from} {element.annotation} {element.to}
                </Card>
              ))}
            </div>
          )}
        </div>
      </>
    </div>
  );
}

export default MyCollapse;
